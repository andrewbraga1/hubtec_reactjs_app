import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import LoginPage from './LoginPage';
import TaskPage from './TaskPage';
import Auth from 'j-toker';
//import $ from 'jquery';

Auth.configure({apiUrl: 'http://localhost:3000/'});


class App extends Component {
  
  render() {
   
    return (
      <Router>
        <>
          
          <Route exact path='/' component={LoginPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/task' component={TaskPage} />
        </>
      </Router>
    );
  }
}

 

export default App;