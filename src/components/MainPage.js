import React, { Component } from 'react';
import BlogForm from './BlogForm';
import { connect } from 'react-redux';
import BlogEntry from './BlogEntry';
import '../css/mainPage.css';

class MainPage extends Component {
  render() {
    const { blogs } = this.props.blogs;
    return (
      <div className="wrapper">
        <BlogForm />
        <BlogEntry blogs={blogs} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    blogs: state.blog
  };
};

export default connect(mapStateToProps)(MainPage);
