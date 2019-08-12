import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from 'j-toker';


class LoginPage extends Component {
   

  constructor() {
    super();
    
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { history } = this.props;

     if (!this.state.username) {
       return this.setState({ error: 'Username is required' });
     }
     if (!this.state.password) {
       return this.setState({ error: 'Password is required' });
    }
     var serviceBaseUrl = "http://localhost:3000";
      axios.post(serviceBaseUrl+'/api/auth/sign_in', {
      
          email: this.state.username,
           password: this.state.password
       })
       .then(response => {
           //console.log(response);
           
         if(response.status === 200){
           console.log(response.headers);
           
             history.push('task');

         }
        
       })
       .catch(error => console.log(error))     
      
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="login-page">
        <form className = "form " onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>Email</label>
          <input type="email" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

          <label>Password</label>
          <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <button type="submit" value="Log In" data-test="submit" >Log in</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;