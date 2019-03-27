import uuid from 'uuid';
import api from '../../services/api';
import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, SET_ENTRIES, DELETE_ENTRY, UPDATE_ENTRY } from '../actions/actionTypes';

export const fetchEntries = () => async dispatch => {
  const entries = await api.fetchEntries();

  dispatch({ type: SET_ENTRIES, payload: entries.reverse() });
};

export const addNewEntry = newEntry => dispatch => {
  const toCreate = { ...newEntry, uuid: uuid() };

  api.createEntry(toCreate);

  dispatch({
    type: ADD_NEW_ENTRY,
    payload: toCreate
  });
};

export const addNewComment = (newComment, postUuid) => dispatch => {
  const toCreate = { ...newComment, uuid: uuid() };
  api.createComment(toCreate, postUuid);

  dispatch({
    type: ADD_NEW_COMMENT,
    payload: toCreate,
    postUuid: postUuid
  });
};

export const deleteEntry = entryUuid => dispatch => {
  api.deleteEntry(entryUuid);
  dispatch({ type: DELETE_ENTRY, payload: entryUuid });
};

export const updateEntry = (entryUuidToUpdate, updatedEntry, userId) => dispatch => {
  api.updateEntry(entryUuidToUpdate, updatedEntry, userId);
  dispatch({ type: UPDATE_ENTRY, entryUuidToUpdate, updatedEntry });
};
