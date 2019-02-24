import React, { Component } from "react";

class Post extends Component {
  render() {
    const { title, body, tags } = this.props.post;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
        <ul>
          {tags
            ? tags.map(tag => {
                return <li>{tag}</li>;
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default Post;
