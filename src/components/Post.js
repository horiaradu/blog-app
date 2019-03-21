import React, { Component } from 'react';
import '../css/posts.css';
import Comments from './Comments';
import EditDeleteFeature from './EditDeleteFeature';

class Post extends Component {
  state = {
    showEditDeleteOptions: false
  };
  onArrowClick = () => {
    this.setState({ showEditDeleteOptions: !this.state.showEditDeleteOptions });
  };
  render() {
    const { title, body, tags } = this.props.post.entry;
    return (
      <div className="blogSeparator">
        <div className="postTitle">
          <h2>{title}</h2>
          {this.state.showEditDeleteOptions && <EditDeleteFeature />}
          <i onClick={this.onArrowClick} className="fas fa-arrow-circle-left" />
        </div>
        <div className="postContent">
          <p>{body}</p>
          <ul className="ulStyle">
            {tags
              ? tags.map(tag => {
                  return (
                    <li key={tag} className="tagStyle">
                      {tag}
                    </li>
                  );
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
