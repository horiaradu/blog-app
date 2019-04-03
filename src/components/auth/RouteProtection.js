import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const EnsureUserIsLoggedInFn = ComponentToBeProtected => {
  class HOC extends React.Component {
    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to="/login" />;
      return <ComponentToBeProtected />;
    }
  }
  return HOC;
};

const EnsureNoUserFn = ComponentToBeProtected => {
  class HOC extends React.Component {
    render() {
      const { auth } = this.props;
      if (auth.uid) return <Redirect to="/" />;
      return <ComponentToBeProtected />;
    }
  }
  return HOC;
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const EnsureUserIsLoggedIn = compose(
  connect(
    mapStateToProps,
    null
  ),
  EnsureUserIsLoggedInFn
);
const EnsureNoUser = compose(
  connect(
    mapStateToProps,
    null
  ),
  EnsureNoUserFn
);

export { EnsureUserIsLoggedIn, EnsureNoUser };
