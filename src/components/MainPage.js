import React, { Component } from "react";
import BlogCreator from "./BlogCreator";
import { connect } from "react-redux";
import Post from "./Post";
import News from "./News";
import uuid from "uuid";
import "../css/mainPage.css";

class MainPage extends Component {
  state = {
    postCheck: true,
    newsCheck: true
  };

  renderBasedOnCheckType = e => {
    if (e.target.value === "post") {
      this.setState({ postCheck: !this.state.postCheck });
    }
    if (e.target.value === "news") {
      this.setState({ newsCheck: !this.state.newsCheck });
    }
  };

  render() {
    const { blogs } = this.props.blogs;
    return (
      <div className="wrapper">
        <div>
          <BlogCreator />
        </div>
        <div className="checkBoxWrap ">
          <div>
            <h2>All:</h2>
          </div>
          {/* comment */}
          <div className="checkboxInput">
            <input
              className="checkbox"
              id="postsCheckBox"
              name="post"
              type="checkbox"
              value="post"
              checked={this.state.postCheck}
              onChange={this.renderBasedOnCheckType}
            />
            <label htmlFor="postsCheckBox">
              {this.state.postCheck ? (
                <div className="checkboxText">
                  <i className="checkSqIcon fas fa-square" />
                  Posts
                </div>
              ) : (
                <div className="checkboxText">
                  <i className="checkSqIcon far fa-square" />
                  Posts
                </div>
              )}
            </label>
          </div>
          {/* comment */}
          <div className="checkboxInput">
            <input
              className="checkbox"
              id="newsCheckBox"
              name="news"
              type="checkbox"
              value="news"
              checked={this.state.newsCheck}
              onChange={this.renderBasedOnCheckType}
            />
            <label htmlFor="newsCheckBox">
              {this.state.newsCheck ? (
                <div className="checkboxText">
                  <i className="checkSqIcon fas fa-square" />
                  News
                </div>
              ) : (
                <div className="checkboxText">
                  <i className="checkSqIcon far fa-square" />
                  News
                </div>
              )}
            </label>
          </div>
        </div>
        <div>
          {(blogs && this.state.postCheck === true) ||
          this.state.newsCheck === true ? (
            blogs.map(blog => {
              if (blog.entryType === "post" && this.state.postCheck === true) {
                return <Post key={uuid()} post={blog} />;
              } else if (
                blog.entryType === "news" &&
                this.state.newsCheck === true
              ) {
                return <News key={uuid()} news={blog} />;
              } else return null;
            })
          ) : blogs &&
            this.state.postCheck === false &&
            this.state.newsCheck === false ? (
            <h4>You've deselected both news and posts</h4>
          ) : null}
        </div>
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
