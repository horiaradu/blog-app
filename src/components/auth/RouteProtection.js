import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const RouteProtector = ComponentToBeProtected => {
  class HOC extends React.Component {
    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to="/login" />;
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

const ConnectHelper = compose(
  connect(
    mapStateToProps,
    null
  ),
  RouteProtector
);

export default ConnectHelper;
