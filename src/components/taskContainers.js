import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios'
import update from 'immutability-helper'
import DatePicker from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import Auth from 'j-toker';

class TasksContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      deadLine: moment().format('YYYY-MM-DD'),
      inputValue: '',
      //headers: Auth.configBase.formatToken
    }
    console.log(Auth);
    
  }
  
  componentDidMount() {
    this.getTasks()
  }

  getTasks() {
    //console.log(this.state.headers);
    
    axios.get('/api/v1/tasks',{
       headers: this.state.headers
     })
    .then(response => {
      this.setState({tasks: response.data})
    })
    .catch(error => console.log(error))
  }


  createTask = (e) => {
       
      axios.post('/api/v1/tasks', {
        task: {
          name: this.state.inputValue,
          deadLine: this.state.deadLine
      }})
      .then(response => {
        const tasks = update(this.state.tasks, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          tasks: tasks,
          inputValue: '',
          deadLine:''
        })
      })
      .catch(error => console.log(error))      
      
      
      
  }

  updateTask = (e, id) => {
    axios.put(`/api/v1/tasks/${id}`, {task: {done: e.target.checked}})
    .then(response => {
      const taskIndex = this.state.tasks.findIndex(x => x.id === response.data.id)
      const tasks = update(this.state.tasks, {
        [taskIndex]: {$set: response.data}
      })
      this.setState({
        tasks: tasks
      })
    })
    .catch(error => console.log(error))      
  }

  deleteTask = (id) => {
    axios.delete(`/api/v1/tasks/${id}`)
    .then(response => {
      const taskIndex = this.state.tasks.findIndex(x => x.id === id)
      const tasks = update(this.state.tasks, {
        $splice: [[taskIndex, 1]]
      })
      this.setState({
        tasks: tasks
      })
    })
    .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  

  render() {
    return (
    <div>  
        
            <div className="inputContainer">
                <input className="taskInput" type="text" 
                    placeholder="Add a task" maxLength="50"
                    name="inputValue"
                    value={this.state.inputValue} onChange={this.handleChange} />
                    {" "}
                     <DatePicker
                      date={this.state.deadLine}
                      onSelect={deadLine => {
                          this.setState(state => ({ deadLine: deadLine }));
                      }}
                   />
                   
            </div> 
            <div align="right"><button className="myButton pull-right"onClick={this.createTask}>Add task</button></div>   
            
        

        <div className="listWrapper">
            <ul className="taskList">
                {this.state.tasks.map((task) => {
                    return(
                    <li className="task" task={task} key={task.id}>
                    <input className="taskCheckbox" type="checkbox" 
                        checked={task.done}
                        onChange={(e) => this.updateTask(e, task.id)} />             
                    <label className="taskLabel">{task.name}</label>
                    <span className="deleteTaskBtn" 
                        onClick={(e) => this.deleteTask(task.id)}>
                        x
                    </span>
                    </li>
                    )       
                })} 	    
            </ul>
        </div>
    </div>
    )
  }
}

export default TasksContainer