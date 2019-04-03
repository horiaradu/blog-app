import React, { Component } from 'react';
import CommentForm from './CommentForm';
import { deleteComment, updateComment } from '../redux/actions/blogActions';
import { connect } from 'react-redux';
import '../css/comments.css';

class Comments extends Component {
  state = {
    showComments: false,
    isEditCommentModeOn: false,
    commentIdInEditMode: ''
  };
  onShowClick = () => {
    this.setState({ showComments: !this.state.showComments });
  };
  onDeleteClick = (commentUuid, entryUuid, userId) => {
    this.props.deleteComment(commentUuid, entryUuid, userId);
  };

  onEditCommentClick = (e, commentUuid) => {
    if (e.target.id === commentUuid) {
      this.setState({ isEditCommentModeOn: true, commentIdInEditMode: e.target.id });
    }
  };
  onCancelClick = () => {
    this.setState({ isEditCommentModeOn: false, commentIdInEditMode: '' });
  };
  onUpdateClick = (commentUuid, data, entryUuid) => {
    this.props.updateComment(commentUuid, data, entryUuid);
    this.setState({ isEditCommentModeOn: false, commentIdInEditMode: '' });
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
                <div key={comment.uuid} className="commentWrap">
                  <i className="fas fa-user avatar" />
                  <div className="content">
                    <h5 className="author">
                      {comment.author}
                      <div className="dateWrap">
                        <span className="date"> {comment.commentDate}</span>
                      </div>
                      {comment.userId === this.props.currentUser.userId &&
                      this.state.commentIdInEditMode !== comment.uuid ? (
                        <div>
                          <button
                            className="deleteCommentButton"
                            onClick={() =>
                              this.onDeleteClick(comment.uuid, this.props.entryUuid, this.props.currentUser.userId)
                            }
                          >
                            Delete
                          </button>
                          <button
                            id={comment.uuid}
                            className="deleteCommentButton"
                            onClick={e => this.onEditCommentClick(e, comment.uuid)}
                          >
                            Edit
                          </button>
                        </div>
                      ) : null}
                    </h5>
                    {this.state.isEditCommentModeOn === true &&
                    comment.userId === this.props.currentUser.userId &&
                    comment.uuid === this.state.commentIdInEditMode ? (
                      <div>
                        <CommentForm
                          onCancelClick={this.onCancelClick}
                          currentUser={this.props.currentUser}
                          entryUuid={this.props.entryUuid}
                          currentComment={comment}
                          onUpdateClick={this.onUpdateClick}
                        />
                      </div>
                    ) : (
                      <div className="commentBody">{comment.text}</div>
                    )}
                  </div>
                </div>
              );
            })
          : null}
        {showComments && this.props.currentUser.userId ? (
          <CommentForm entryUuid={this.props.entryUuid} currentUser={this.props.currentUser} />
        ) : null}
      </div>
    );
  }
}

export default connect(
  null,
  { deleteComment, updateComment }
)(Comments);
