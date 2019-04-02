import React from 'react';
import CommentForm from './CommentForm';

class EditComment extends React.Component {
  state = {
    author: this.props.commentInEditMode.author,
    text: this.props.commentInEditMode.text,
    commentDate: this.props.commentInEditMode.commentDate,
    userId: this.props.currentUser.userId ? this.props.currentUser.userId : ''
  };

  updateCommentWithCurrentState = (author, text) => {
    return this.setState({ author: author }), this.setState({ text: text });
  };

  onUpdateCommentClick = () => {
    const updatedComment = {
      author: this.state.author,
      text: this.state.text,
      commentDate: this.props.commentInEditMode.commentDate,
      userId: this.props.currentUser.userId ? this.props.currentUser.userId : ''
    };
    this.props.onUpdateClick(this.props.commentInEditMode.uuid, updatedComment, this.props.entryUuid);
  };

  render() {
    return (
      <div>
        <CommentForm
          onCancelClick={this.props.onCancelClick}
          currentUser={this.props.currentUser}
          entryUuid={this.props.entryUuid}
          commentInEditMode={this.props.commentInEditMode}
          updateCommentWithCurrentState={this.updateCommentWithCurrentState}
        />
        <div>
          <button onClick={this.props.onCancelClick}>Cancel</button>
          <button onClick={this.onUpdateCommentClick}>Update</button>
        </div>
      </div>
    );
  }
}

export default EditComment;
