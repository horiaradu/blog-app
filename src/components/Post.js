import React, { Component } from 'react';
import '../css/posts.css';
import Comments from './Comments';

import BlogForm from './BlogForm';
import EditEntry from './EditEntry';
import DeleteEntry from './DeleteEntry';

class Post extends Component {
  state = {
    isEditModeOn: false
  };
  changeState = () => {
    this.setState({ isEditModeOn: !this.state.isEditModeOn });
  };
  render() {
    const { title, body, tags } = this.props.post.entry;
    const postUuid = this.props.post.entry.uuid;
    return (
      <div className="blogSeparator">
        {this.state.isEditModeOn ? (
          <BlogForm onUpdateClick={this.changeState} entry={this.props.post.entry} entryUuid={postUuid} />
        ) : (
          <div>
            <div className="postTitle">
              <span>
                <h2>{title}</h2>
              </span>
              <span>
                {this.props.auth.uid && (
                  <span>
                    <EditEntry onEditClick={this.changeState} postUuid={postUuid} />
                    <DeleteEntry onEditClick={this.changeState} postUuid={postUuid} />
                  </span>
                )}
              </span>
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
        )}
      </div>
    );
  }
}

export default Post;
