import React, { Component } from 'react';
import '../css/posts.css';
import Comments from './Comments';

class Post extends Component {
  render() {
    const { title, body, tags } = this.props.post.entry;
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
          <Comments comments={this.props.post.comments} postUuid={this.props.post.entry.uuid} />
        </div>
      </div>
    );
  }
}

export default Post;
