import uuid from 'uuid';
import api from '../../services/api';
import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, SET_ENTRIES } from '../actions/actionTypes';

export const fetchEntries = () => async dispatch => {
  const entries = await api.fetchEntries();

  dispatch({ type: SET_ENTRIES, payload: entries.reverse() });
};

export const addNewEntry = newEntry => dispatch => {
  const toCreate = { ...newEntry, uuid: uuid() };

  // api.createEntry(toCreate);

  dispatch({
    type: ADD_NEW_ENTRY,
    payload: toCreate
  });
};

export const addNewComment = (newComment, postUuid) => async dispatch => {
  const toCreate = { ...newComment, uuid: uuid() };
  api.createComment(toCreate, postUuid);

  dispatch({
    type: ADD_NEW_COMMENT,
    payload: toCreate,
    postUuid: postUuid
  });
};
