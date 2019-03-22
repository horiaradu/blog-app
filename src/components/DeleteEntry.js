import React from 'react';

import { connect } from 'react-redux';
import { deleteEntry } from '../redux/actions/blogActions';

const DeleteEntry = props => {
  return (
    <div className="deleteButton">
      <i className="fas fa-trash-alt" onClick={() => props.deleteEntry(props.postUuid)} />
    </div>
  );
};

export default connect(
  null,
  { deleteEntry }
)(DeleteEntry);
