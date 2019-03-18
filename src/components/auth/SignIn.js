import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions/authAuctions';
import { Redirect } from 'react-router-dom';
import '../../css/auth.css';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
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
          <button className="loginButton">Login</button>
          {authError && <p>{authError}</p>}
        </form>
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
  { signIn }
)(SignIn);
