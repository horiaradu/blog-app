import uuid from 'uuid';
import api from '../../services/api';
import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, SET_ENTRIES } from '../actions/actionTypes';

export const fetchEntries = () => dispatch => {
  // side effect: http call
  const entries = api.fetchEntries();

  // dispatch action => write in store
  dispatch({ type: SET_ENTRIES, payload: entries });
};

export const addNewEntry = newEntry => (dispatch, getState, { getFirebase, getFirestore }) => {
  // const toCreate = { ...newEntry, uuid: uuid() };
  // side effect: http call
  // api.createEntry(toCreate);

  const firestoreEntries = getFirestore();
  firestoreEntries
    .collection('entries')
    .add({
      ...newEntry
    })
    .then(() => {
      dispatch({
        type: ADD_NEW_ENTRY,
        payload: newEntry
      });
    });

  // dispatch action => write in store
};

export const addNewComment = (newComment, postUuid) => dispatch => {
  // TODO: api.createComment(....)
  const toCreate = { ...newComment, uuid: uuid() };

  // side effect: http call
  api.createComment(toCreate, postUuid);
  dispatch({
    type: ADD_NEW_COMMENT,
    payload: toCreate,
    postUuid: postUuid
  });
};
