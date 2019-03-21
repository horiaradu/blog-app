import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteEntry } from '../redux/actions/blogActions';

const DeleteFeature = props => {
  return (
    <div>
      <h4>
        <Link to="/" onClick={() => props.deleteEntry(props.postUuid)}>
          Delete
        </Link>
      </h4>
    </div>
  );
};

export default connect(
  null,
  { deleteEntry }
)(DeleteFeature);
