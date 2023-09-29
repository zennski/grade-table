// src/QpiCalculator.js
import React, { Component } from 'react';
import './Form2Table.css'

class QpiCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      courseNumber: '',
      units: '',
      grade: '', 
      courses: [],
      searchQuery: '',
    };
  }

  //take input from user and display on text box
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //blank input fields after submission
  handleSubmit = (event) => {
    event.preventDefault();
    const { courseName, courseNumber, units, grade, courses } = this.state;
    const newCourse = { courseName, courseNumber, units, grade };
    this.setState(
      {
        courses: [...courses, newCourse],
        courseName: '',
        courseNumber: '',
        units: '',
        grade: '', 
      },
      () => this.calculateTotalQPI()
    );
  };

  //QPI Equation
  calculateTotalQPI = () => {
    const { courses } = this.state;
    const totalUnits = courses.reduce((acc, course) => acc + parseFloat(course.units), 0);
    const totalGradePoints = courses.reduce((acc, course) => acc + this.gradeToPoint(course.grade) * parseFloat(course.units), 0);
    return totalGradePoints / totalUnits || 0;
  };

  //Grading System
  gradeToPoint = (grade) => {
    const gradePoints = {
      A: 4.0,
      'B+': 3.5,
      B: 3.0,
      'C+': 2.5,
      C: 2.0,
      D: 1.0,
      F: 0.0,
    };
    return gradePoints[grade] || 0;
  };

  //Search bar take input from user
  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { courseName, courseNumber, units, grade, courses, searchQuery } = this.state;

    // Filter courses based on the search input
    const filteredCourses = courses.filter(
      (course) =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      //form (user inputs)
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> Course Name: </label>
          <div>
            <input
              type="text"
              name="courseName"
              value={courseName}
              onChange={this.handleInputChange}
            />
          </div>
    
          <label> Course Number: </label>
          <div>
            <input
              type="text"
              name="courseNumber"
              value={courseNumber}
              onChange={this.handleInputChange}
            />
          </div>

          <label> Units: </label>
          <div>
            <input
              type="number"
              name="units"
              value={units}
              onChange={this.handleInputChange}
            />
          </div>

          <label> Grade: </label>
            <div>
              <input
                type="radio"
                name="grade"
                value="A"
                checked={grade === 'A'}
                onChange={this.handleInputChange}
              />
              A 
            </div>
            
            <div>
              <input
                type="radio"
                name="grade"
                value="B+"
                checked={grade === 'B+'}
                onChange={this.handleInputChange}
              />
              B+ 
            </div>

            <div>
              <input
                type="radio"
                name="grade"
                value="B"
                checked={grade === 'B'}
                onChange={this.handleInputChange}
              />
              B 
            </div>

            <div>
              <input
                type="radio"
                name="grade"
                value="C+"
                checked={grade === 'C+'}
                onChange={this.handleInputChange}
              />
              C+ 
            </div>

            <div>
              <input
                type="radio"
                name="grade"
                value="C"
                checked={grade === 'C'}
                onChange={this.handleInputChange}
              />
              C 
            </div>

            <div>
              <input
                type="radio"
                name="grade"
                value="D"
                checked={grade === 'D'}
                onChange={this.handleInputChange}
              />
              D 
            </div>

            <div>
              <input
                type="radio"
                name="grade"
                value="F"
                checked={grade === 'F'}
                onChange={this.handleInputChange}
              />
              F 
            </div>
          
          <button type="submit">Submit</button>
        </form>
        
        <div className='table'>
          <input
            type="text"
            placeholder="Search by Course Name or Number"
            value={searchQuery}
            onChange={this.handleSearch}
          />

          <div>
            <h2>Courses</h2>
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course Number</th>
                  <th>Units</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.courseName}</td>
                    <td>{course.courseNumber}</td>
                    <td>{course.units}</td>
                    <td>{course.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="totalQPI">
            <h2>Total QPI: {this.calculateTotalQPI().toFixed(2)}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default QpiCalculator;
