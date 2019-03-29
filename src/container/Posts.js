import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlogEntries from '../components/BlogEntries';
import '../css/mainPage.css';
import { fetchEntries } from '../redux/actions/blogActions';
import { fetchUsers } from '../redux/actions/authAuctions';

class MainPage extends Component {
  componentDidMount() {
    this.props.fetchEntries();
    this.props.fetchUsers();
  }

  render() {
    const { blogs, auth, profile, users } = this.props;

    return (
      <div className="wrapper">
        <BlogEntries blogs={blogs} auth={auth} profile={profile} users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogs: state.blog.entries,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.auth.users
  };
};

export default connect(
  mapStateToProps,
  { fetchEntries, fetchUsers }
)(MainPage);
