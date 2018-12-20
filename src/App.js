import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super(); //calls react component class
    this.state = {
      title: 'Search Student Information',
      students: []
    }
  }

  // make ajax calls here
  componentDidMount() {
    console.log('component has mounted');
  }

  searchStudent(event) {
    event.preventDefault(); 
    console.log('in searchStudent method');

    fetch('http://localhost:3000/api/search-students')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var student = JSON.stringify(data);
      this.setState ({
        students: student
      })
    })
    .catch(error => console.error(error));
  }

  render() {
    let title = this.state.title;

    return (
      <div className="App">
        <h1>{title}</h1>
        <form ref="formForStudents">
          <input type="text" ref="studentID" placeholder="empl id"/>
          <button onClick={this.searchStudent.bind(this)}>Search student</button>
        </form>
        <pre>{this.state.students}</pre>
      </div>
    );
  }
}

export default App;
