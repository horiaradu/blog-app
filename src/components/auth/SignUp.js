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
      <div id="container">
        <div className="formWrap">
          <h1>Sign Up</h1>

          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input placeholder="First Name" id="firstName" type="text" onChange={this.onInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input placeholder="Last Name" id="lastName" type="text" onChange={this.onInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input placeholder="E-mail address" id="email" type="email" onChange={this.onInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input placeholder="Password" id="password" type="password" onChange={this.onInputChange} />
            </div>
            <button className="button">Sign Up</button>
            {authError && <p>{authError}</p>}
            <p className="authFooter">
              Already have an account? Click{' '}
              <Link className="authFooterLink" to="/login">
                here
              </Link>{' '}
              to LogIn
            </p>
          </form>
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
