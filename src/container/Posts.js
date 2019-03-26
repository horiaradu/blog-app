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
    const { blogs } = this.props;
    const { auth } = this.props;

    return (
      <div className="wrapper">
        {/* hide when user is not logged in */}
        {/* {auth.uid && <BlogForm />} */}
        <BlogEntries blogs={blogs} auth={auth} />
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
