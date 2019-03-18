import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/authAuctions';
import '../../css/auth.css';

const Navbar = props => {
  const auth = props.auth;
  return (
    <nav>
      {auth.uid ? (
        <div>
          <a className="logoutBtn" href="/login" onClick={props.signOut}>
            Logout
          </a>
        </div>
      ) : null}
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
