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
    const { blogs, currentUser, users } = this.props;

    return (
      <div className="wrapper">
        <BlogEntries blogs={blogs} currentUser={currentUser} users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogs: state.blog.entries,
    currentUser: state.firebase.profile,
    users: state.auth.users
  };
};

export default connect(
  mapStateToProps,
  { fetchEntries, fetchUsers }
)(MainPage);
