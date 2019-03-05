import uuid from 'uuid';
// import api from '../services/api';

export const fetchEntries = () => dispatch => {
  dispatch({
    type: 'FETCH_ENTRIES'
  });
};

export const addNewEntry = newEntry => dispatch => {
  dispatch({
    type: 'ADD_NEW_ENTRY',
    payload: { ...newEntry, uuid: uuid() }
  });
};

export const addNewComment = (newComment, postUuid) => dispatch => {
  dispatch({
    type: 'ADD_NEW_COMMENT',
    payload: { ...newComment, uuid: uuid() },
    postUuid: postUuid
  });
};
