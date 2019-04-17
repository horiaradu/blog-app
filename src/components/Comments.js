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
      isEditCommentModeOn: false,
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
  getUserName = () => {
    const userName = this.props.users.find(user => {
      return user.userId === this.props.entryUserId;
    });
    return userName;
  };

  onPinCommentClick = (comment, entryUuid, currentUser, entryUserId) => {
    const { comments } = this.props;

    if (currentUser.userId !== entryUserId) {
      return;
    }

    const arr = comments.map(c => {
      if (c.uuid === comment.uuid) {
        return { ...c, isPinned: !comment.isPinned };
      } else return c;
    });

    const pinnedComments = arr.filter(c => {
      return c.isPinned;
    });
    const unpinnedComments = arr.filter(c => {
      return !c.isPinned;
    });

    const sortedUnpinnedComments = unpinnedComments.sort(function(x, y) {
      return new Date(x.commentDate).getTime() - new Date(y.commentDate).getTime();
    });

    const arrOfPinnedAndSortedUnpinnedComments = [...pinnedComments, ...sortedUnpinnedComments];

    this.props.pinComment(arrOfPinnedAndSortedUnpinnedComments, entryUuid);
  };

  moveElementInArray = (array, value, positionChange) => {
    const oldIndex = array.indexOf(value);
    if (oldIndex > -1) {
      let newIndex = oldIndex - positionChange;

      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= array.length) {
        newIndex = array.length;
      }

      let arrayClone = array.slice();
      arrayClone.splice(oldIndex, 1);
      arrayClone.splice(newIndex, 0, value);

      return arrayClone;
    }
    return array;
  };

  movePinnedCommentUp = (comment, entryUuid) => {
    const { comments } = this.props;
    const pinnedComments = comments.filter(c => {
      return c.isPinned;
    });
    const unPinnedComments = comments.filter(c => {
      return !c.isPinned;
    });

    const sortedPinnedComments = this.moveElementInArray(pinnedComments, comment, 1);
    const newSortedArray = [...sortedPinnedComments, ...unPinnedComments];
    this.props.pinComment(newSortedArray, entryUuid);
  };

  movePinnedCommentDown = (comment, entryUuid) => {
    const { comments } = this.props;
    const pinnedComments = comments.filter(c => {
      return c.isPinned;
    });
    const unPinnedComments = comments.filter(c => {
      return !c.isPinned;
    });

    const sortedPinnedComments = this.moveElementInArray(pinnedComments, comment, -1);
    const newSortedArray = [...sortedPinnedComments, ...unPinnedComments];
    this.props.pinComment(newSortedArray, entryUuid);
  };

  hidePinDownButton = (comments, index, array) => {
    if (index === comments.length - 1 || (array[index].isPinned === true && array[index + 1].isPinned === false)) {
      return true;
    }
    return false;
  };

  render() {
    const { showComments, isEditCommentModeOn, commentIdInEditMode } = this.state;
    const { comments, currentUser, entryUuid, entryUserId } = this.props;
    const userName = this.getUserName();
    const showEditDeleteButtons = comment => {
      if (comment.userId === currentUser.userId && commentIdInEditMode !== comment.uuid) {
        return true;
      }
      return false;
    };
    const showCommentFormForCurrentCommentInEditMode = comment => {
      if (
        isEditCommentModeOn === true &&
        comment.userId === currentUser.userId &&
        comment.uuid === commentIdInEditMode
      ) {
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
          comments.map((comment, index, array) => {
            return (
              <div key={comment.uuid} className="commentWrap">
                <i className="fas fa-user avatar" />
                <div className="content">
                  <h5 className={comment.isPinned ? 'pinnedAuthor' : 'author'}>{comment.author} </h5>
                  {comment.isPinned && this.getUserName() && (
                    <span className="pinnedComment pinnedText">
                      <i
                        className="fas fa-thumbtack pinnedIcon"
                        onClick={() => this.onPinCommentClick(comment, entryUuid, currentUser, entryUserId)}
                      >
                        {currentUser.userId === entryUserId && <span className="pinnedIconHoverText">Unpin</span>}
                      </i>

                      {`Pinned by ${userName.firstName} ${userName.lastName}`}
                      <span className="btn-group">
                        {index !== 0 && (
                          <i
                            onClick={() => this.movePinnedCommentUp(comment, entryUuid)}
                            className="fas fa-chevron-up pinUp"
                          />
                        )}
                        {!this.hidePinDownButton(comments, index, array) && (
                          <i
                            onClick={() => this.movePinnedCommentDown(comment, entryUuid)}
                            className="fas fa-chevron-down pinDown"
                          />
                        )}
                      </span>
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
                      currentUser={currentUser}
                      entryUuid={entryUuid}
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
