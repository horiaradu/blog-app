import React, { Component } from 'react';
import CommentForm from './CommentForm';
import { deleteComment, updateComment, pinComment } from '../redux/actions/blogActions';
import { connect } from 'react-redux';
import '../css/comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,

      commentIdInEditMode: ''
    };
  }

  onShowClick = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  onDeleteClick = (commentUuid, entryUuid, userId) => {
    this.props.deleteComment(commentUuid, entryUuid, userId);
  };

  onEditCommentClick = (e, commentUuid) => {
    if (e.target.id === commentUuid) {
      this.setState({ commentIdInEditMode: e.target.id });
    }
  };

  onCancelClick = () => {
    this.setState({ commentIdInEditMode: '' });
  };

  onUpdateClick = (commentUuid, data, entryUuid) => {
    this.props.updateComment(commentUuid, data, entryUuid);
    this.setState({ commentIdInEditMode: '' });
  };

  getUserName = () => {
    const userName = this.props.users.find(user => {
      return user.userId === this.props.entryUserId;
    });
    return userName;
  };

  onPinCommentClick = (comment, entryUuid, currentUser, entryUserId) => {
    const { comments } = this.props;
    if (currentUser.userId === entryUserId) {
      const arr = comments.map(c => {
        if (c.uuid === comment.uuid) {
          return { ...c, isPinned: !comment.isPinned };
        } else return c;
      });

      const sortedArr = arr.sort(function(x, y) {
        return y.isPinned - x.isPinned || new Date(x.commentDate).getTime() - new Date(y.commentDate).getTime();
      });

      this.props.pinComment(sortedArr, entryUuid);
    }
  };

  render() {
    const { showComments, commentIdInEditMode } = this.state;
    const { comments, currentUser, entryUuid, entryUserId } = this.props;
    const userName = this.getUserName();
    const showEditDeleteButtons = comment => {
      if (comment.userId === currentUser.userId && commentIdInEditMode !== comment.uuid) {
        return true;
      }
      return false;
    };
    const showCommentFormForCurrentCommentInEditMode = comment => {
      if (comment.userId === currentUser.userId && comment.uuid === commentIdInEditMode) {
        return true;
      }
      return false;
    };

    return (
      <div className="comments">
        <h3 className="commentHeader">
          Comments <i style={{ cursor: 'pointer' }} className="fas fa-sort-down" onClick={this.onShowClick} />
        </h3>
        {showComments &&
          comments.map(comment => {
            return (
              <div key={comment.uuid} className="commentWrap">
                <i className="fas fa-user avatar" />
                <div className="content">
                  <h5 className={comment.isPinned ? 'pinnedAuthor' : 'author'}>{comment.author} </h5>
                  {comment.isPinned && this.getUserName() && (
                    <span className="pinnedComment">
                      <i
                        className="fas fa-thumbtack pinnedIcon"
                        onClick={() => this.onPinCommentClick(comment, entryUuid, currentUser, entryUserId)}
                      >
                        {currentUser.userId === entryUserId && <span className="pinnedIconHoverText">Unpin</span>}
                      </i>

                      {`Pinned by ${userName.firstName} ${userName.lastName}`}
                    </span>
                  )}
                  <span>
                    {currentUser.userId === entryUserId && comment.isPinned === false && (
                      <i
                        className="fas fa-thumbtack pinIcon"
                        onClick={() => this.onPinCommentClick(comment, entryUuid, currentUser, entryUserId)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </span>
                  <div className="dateWrap">
                    <span className="date"> {comment.commentDate}</span>
                  </div>
                </div>

                {showCommentFormForCurrentCommentInEditMode(comment) ? (
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
                {showEditDeleteButtons(comment) && (
                  <div className="buttonsWrap">
                    <button
                      id={comment.uuid}
                      className="editCommentButton"
                      onClick={e => this.onEditCommentClick(e, comment.uuid)}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteCommentButton"
                      onClick={() => this.onDeleteClick(comment.uuid, entryUuid, currentUser.userId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        {showComments && currentUser.userId && <CommentForm entryUuid={entryUuid} currentUser={currentUser} />}
      </div>
    );
  }
}

export default connect(
  null,
  { deleteComment, updateComment, pinComment }
)(Comments);
