import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteFeature } from '../redux/actions/blogActions';
import firebase from '../config/fbConfig';

const DeleteFeature = props => {
  const entryId = firebase.firestore().collection('entries');
  console.log(entryId);
  return (
    <div>
      <h4>
        <Link to="/" onClick={() => props.deleteFeature(entryId)}>
          Delete
        </Link>
      </h4>
    </div>
  );
};

export default connect(
  null,
  { deleteFeature }
)(DeleteFeature);
