import React, { Component } from "react";
import "../css/posts.css";

class Post extends Component {
  render() {
    const { title, body, tags } = this.props.post;
    return (
      <div className="blogSeparator">
        <div className="postTitle">
          <h2>{title}</h2>
        </div>
        <div className="postContent">
          <p>{body}</p>
          <ul className="ulStyle">
            {tags
              ? tags.map(tag => {
                  return <li className="tagStyle">{tag}</li>;
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default Post;
