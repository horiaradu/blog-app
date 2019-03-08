import React, { Component } from 'react';
import BlogForm from '../components/BlogForm';
import { connect } from 'react-redux';
import BlogEntries from '../components/BlogEntries';
import '../css/mainPage.css';
import { fetchEntries } from '../redux/actions/blogActions';

class MainPage extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    const blogs = this.props.blogs;
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
    blogs: state.blog.entries
  };
};

export default connect(
  mapStateToProps,
  { fetchEntries }
)(MainPage);
