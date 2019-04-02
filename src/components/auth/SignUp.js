import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/authAuctions';

import { Link } from 'react-router-dom';
import '../../css/auth.css';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { authError } = this.props;

    return (
      <div className="loginContainer">
        <form className="loginFormWrap" onSubmit={this.onFormSubmit}>
          <label className="loginLabel" htmlFor="email">
            Email
          </label>
          <input
            placeholder="E-mail address"
            className="loginInput"
            id="email"
            type="email"
            onChange={this.onInputChange}
          />
          <label className="loginLabel" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Password"
            className="loginInput"
            id="password"
            type="password"
            onChange={this.onInputChange}
          />
          <label className="loginLabel" htmlFor="firstName">
            First Name
          </label>
          <input
            placeholder="First Name"
            className="loginInput"
            id="firstName"
            type="text"
            onChange={this.onInputChange}
          />
          <label className="loginLabel" htmlFor="lastName">
            Last Name
          </label>
          <input
            placeholder="Last Name"
            className="loginInput"
            id="lastName"
            type="text"
            onChange={this.onInputChange}
          />
          <button className="loginButton">Sign Up</button>
          {authError && <p>{authError}</p>}
        </form>
        <div>
          Already have an account? Click <Link to="/login">here</Link> to LogIn
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
