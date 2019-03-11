import React, { Component } from 'react';

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
    console.log(this.state);
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

export default SignIn;
