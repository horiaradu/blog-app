import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/authAuctions';

const Navbar = props => {
  const auth = props.auth;
  return (
    <nav>
      <div>
        <Link to="/">Blog App</Link>
        {auth.uid ? (
          <div>
            <a href="/login" onClick={props.signOut}>
              Logout
            </a>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Navbar);
