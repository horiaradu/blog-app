import React, { Component } from 'react';
import BlogForm from '../components/BlogForm';
import { connect } from 'react-redux';
import BlogEntries from '../components/BlogEntries';
import '../css/mainPage.css';
import { fetchEntries } from '../redux/actions/blogActions';
import { Redirect } from 'react-router-dom';

class MainPage extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    const { blogs, auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="wrapper">
        <BlogForm />
        <BlogEntries blogs={blogs} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    blogs: state.blog.entries,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchEntries }
)(MainPage);
