import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions/authAuctions';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
      <div id="container">
        <div className="formWrap">
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input placeholder="E-mail address" id="email" type="email" onChange={this.onInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input placeholder="Password" id="password" type="password" onChange={this.onInputChange} />
            </div>
            <button className="button">Login</button>
            {authError && <p>{authError}</p>}
            <p className="authFooter">
              New to our page? Click{' '}
              <Link className="authFooterLink" to="/signup">
                here
              </Link>{' '}
              to Join Us
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
  { signIn }
)(SignIn);
