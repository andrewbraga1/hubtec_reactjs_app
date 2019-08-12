import React, { Component } from 'react';
import './App.css';
import TasksContainer from './components/taskContainers';
import axios from 'axios';

class TaskPage extends Component {
    signOut =  (evt)=> {
             evt.preventDefault();
             const { history } = this.props;
        
       
            var serviceBaseUrl = "http://localhost:3000";
        
             axios.delete(serviceBaseUrl+'/api/auth/sign_out',
             {
               // headers: {formatToken}
              })
              .then(response => {
                if(response.status === 200)
              
               
                history.push('login');
              })
              .catch(error => console.log(error))     
            
        
          }
    render() {
        return(
        <div className = "container">
            <div className="header">
                <h1>Task List</h1>
                <div align="right"><button className="myButton pull-right" onClick={this.signOut}>LogOut</button></div>  
            </div>   
            <TasksContainer />      
        </div> 
           
        );
   
    }
}
export default TaskPage;        