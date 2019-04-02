import React, { Component } from 'react';
import '../css/posts.css';
import Comments from './Comments';
import BlogForm from './BlogForm';
import EditEntry from './EditEntry';
import DeleteEntry from './DeleteEntry';

class Post extends Component {
  state = {
    isEditModeOn: false,
    isUser: false
  };
  changeState = () => {
    this.setState({ isEditModeOn: !this.state.isEditModeOn });
  };
  isAuthor = () => {
    if (this.props.currentUser.userId === this.props.post.entry.userId) {
      return true;
    }
    return false;
  };
  getUserName = () => {
    const userName = this.props.users.find(user => {
      return user.userId === this.props.post.entry.userId;
    });
    return userName;
  };

  render() {
    const { title, body, tags, userId } = this.props.post.entry;

    const entryUuid = this.props.post.entry.uuid;
    const currentUser = this.props.currentUser;
    const userName = this.getUserName();
    return (
      <div className="blogSeparator">
        {this.state.isEditModeOn ? (
          <BlogForm
            onUpdateClick={this.changeState}
            entry={this.props.post.entry}
            entryUuid={entryUuid}
            userId={userId}
          />
        ) : (
          <div>
            <div className="postTitle">
              <span>
                <h2>{title}</h2>
              </span>
              <span>
                {this.isAuthor() && (
                  <span>
                    <EditEntry onEditClick={this.changeState} entryUuid={entryUuid} />
                    <DeleteEntry onEditClick={this.changeState} entryUuid={entryUuid} />
                  </span>
                )}
              </span>
            </div>
            <div className="postContent">
              {this.getUserName() && (
                <h4 key={entryUuid}>Created by - {`${userName.firstName} ${userName.lastName}`}</h4>
              )}

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
              <Comments
                comments={this.props.post.comments}
                entryUuid={this.props.post.entry.uuid}
                currentUser={currentUser}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
