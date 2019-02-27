import React, { Component } from "react";
import Post from "./Post";
import News from "./News";
import FilterEntries from "./FilterEntries";

class RenderEntries extends Component {
  state = {
    postCheck: true,
    newsCheck: true
  };

  changePostCheck = () => {
    this.setState({ postCheck: !this.state.postCheck });
  };

  changeNewsCheck = () => {
    this.setState({ newsCheck: !this.state.newsCheck });
  };

  render() {
    const { blogs } = this.props;
    return (
      <div>
        <FilterEntries
          filter={this.state}
          changePostCheck={this.changePostCheck}
          changeNewsCheck={this.changeNewsCheck}
        />
        <div>
          {(blogs && this.state.postCheck === true) ||
          this.state.newsCheck === true ? (
            blogs.map(blog => {
              if (blog.entryType === "post" && this.state.postCheck === true) {
                return <Post key={blog.uuid} post={blog} />;
              } else if (
                blog.entryType === "news" &&
                this.state.newsCheck === true
              ) {
                return <News key={blog.uuid} news={blog} />;
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

export default RenderEntries;
