import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { REACT_APP_HOST } from "./constants";
import { connect } from "react-redux";
import { setUser } from "./actions/Login";
import { userInfo, login } from "./actions/UserProfile";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  componentDidMount() {}
  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { history } = this.props;

    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }
    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }
    axios.defaults.headers["Content-Type"] = "application/json";

    axios
      .post(REACT_APP_HOST + "/api/auth/sign_in", {
        email: this.state.username,
        password: this.state.password
      })
      .then(response => {
        //console.log(response);

        if (response.status === 200) {
          //console.log(response.headers);
          this.props.setUser(true);
          this.props.userInfo(response.headers);
          history.push("task");
        } else {
          window.location.reload();
        }
      })
      .catch(error =>
        window.alert(
          `Ops :(
          Algo de errado aconteceu. Tente novamente mais tarde.`
        )
      );
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="login-page">
        <form className="form " onSubmit={this.handleSubmit}>
          {this.state.error && (
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          )}
          <label>Email</label>
          <input
            type="email"
            data-test="username"
            value={this.state.username}
            onChange={this.handleUserChange}
          />

          <label>Password</label>
          <input
            type="password"
            data-test="password"
            value={this.state.password}
            onChange={this.handlePassChange}
          />

          <button type="submit" value="Log In" data-test="submit">
            Log in
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  { userInfo, login, setUser }
)(LoginPage);
