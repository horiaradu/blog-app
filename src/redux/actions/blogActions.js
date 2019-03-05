import uuid from 'uuid';
import api from '../../services/api';
import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, SET_ENTRIES } from '../actions/actionTypes';

export const fetchEntries = () => dispatch => {
  // side effect: http call
  const entries = api.fetchEntries();

  // dispatch action => write in store
  dispatch({ type: SET_ENTRIES, payload: entries });
};

export const addNewEntry = newEntry => dispatch => {
  const toCreate = { ...newEntry, uuid: uuid() };

  // side effect: http call
  api.createEntry(toCreate);

  // dispatch action => write in store
  dispatch({
    type: ADD_NEW_ENTRY,
    payload: toCreate
  });
};

export const addNewComment = (newComment, postUuid) => dispatch => {
  dispatch({
    type: ADD_NEW_COMMENT,
    payload: { ...newComment, uuid: uuid() },
    postUuid: postUuid
  });
};
