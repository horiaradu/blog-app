import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteEntry } from '../redux/actions/blogActions';

const DeleteEntry = props => {
  return (
    <div>
      <h4>
        <i class="fas fa-trash-alt" onClick={() => props.deleteEntry(props.postUuid)} />
      </h4>
    </div>
  );
};

export default connect(
  null,
  { deleteEntry }
)(DeleteEntry);
