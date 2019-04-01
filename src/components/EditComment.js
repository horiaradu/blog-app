import React, { Component } from 'react';
import CommentForm from './CommentForm';

const EditComment = props => {
  return (
    <div>
      <CommentForm
        onCancelClick={props.onCancelClick}
        currentUser={props.currentUser}
        entryUuid={props.entryUuid}
        currentComment={props.currentComment}
        onUpdateClick={props.onUpdateClick}
      />
    </div>
  );
};

export default EditComment;
