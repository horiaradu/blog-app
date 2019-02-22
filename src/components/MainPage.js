import React, { Component } from "react";
import BlogCreator from "./BlogCreator";
import { connect } from "react-redux";
import Post from "./Post";

class MainPage extends Component {
  render() {
    console.log(this.props.blogs);
    const { blogs } = this.props;
    return (
      <div>
        <div>
          <BlogCreator />
        </div>
        <div>
          <ul>
            {blogs
              ? blogs.map(entry => {
                  return (
                    <li>
                      <Post post={entry} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogs: state.blog.blogs
  };
};

export default connect(mapStateToProps)(MainPage);
