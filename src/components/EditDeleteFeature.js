import React from 'react';
import DeleteFeature from './DeleteFeature';
const EditDeleteFeature = props => {
  return (
    <div>
      <ul>
        <li>Edit</li>
        <li>
          <DeleteFeature postUuid={props.postUuid} />
        </li>
      </ul>
    </div>
  );
};
export default EditDeleteFeature;
