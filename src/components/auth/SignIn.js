import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions/authAuctions';

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
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={this.onInputChange} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={this.onInputChange} />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { signIn }
)(SignIn);
