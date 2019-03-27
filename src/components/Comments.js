import React, { Component } from 'react';
import CommentForm from './CommentForm';
import '../css/comments.css';

class Comments extends Component {
  state = {
    showComments: false
  };
  onShowClick = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    const { showComments } = this.state;
    const comments = this.props.comments;

    return (
      <div className="comments">
        <h3 className="commentHeader">
          Comments <i style={{ cursor: 'pointer' }} className="fas fa-sort-down" onClick={this.onShowClick} />
        </h3>
        {showComments
          ? comments.map(comment => {
              return (
                <div className="commentWrap">
                  <i class="fas fa-user avatar" />
                  <div className="content">
                    <h5 className="author">
                      {comment.author}
                      <div className="dateWrap">
                        <span className="date"> {comment.commentDate}</span>
                      </div>
                    </h5>
                    <div className="commentBody">{comment.text}</div>
                  </div>
                </div>
              );
            })
          : null}
        {showComments ? <CommentForm postUuid={this.props.postUuid} user={this.props.user} /> : null}
      </div>
    );
  }
}

export default Comments;
