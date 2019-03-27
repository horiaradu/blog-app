import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/authAuctions';
import { Link } from 'react-router-dom';
import '../../css/auth.css';
import '../../css/navbar.css';

const Navbar = props => {
  const { auth, profile } = props;

  return (
    <nav>
      {auth.uid ? (
        <div className="navbarContainer">
          <div className="navbarWrap">
            <span>
              <Link className="navbarElement" to="/">
                Blog App
              </Link>
            </span>
            <span className="rightSideSpan">
              <Link className="navbarElement" to="/createEntry">
                Create Entry
              </Link>
              <Link className="navbarElement" to="/" onClick={props.signOut}>
                Logout
              </Link>
              <span className="initials">{profile.initials}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="navbarContainer">
          <div className="navbarWrap">
            <span>
              <Link className="navbarElement" to="/">
                Blog App
              </Link>
            </span>
            <span className="rightSideSpan">
              {/* <Link className="navbarElement" to="/login">
                Create Entry
              </Link> */}
              <Link className="navbarElement" to="signup">
                SignUp
              </Link>
              <Link className="navbarElement" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Navbar);
