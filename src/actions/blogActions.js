import uuid from "uuid";
import api from '../services/api';

export const fetchEntries = () => async dispatch => {
  const entries = api.getEntries();
  dispatch({ type: 'SET_ENTRIES', entries: entries })
}

export const addNewEntry = newEntry => dispatch => {
  dispatch({
    type: "ADD_NEW_ENTRY",
    payload: { ...newEntry, uuid: uuid() }
  });
};

export const addNewComment = newComment => dispatch => {
  dispatch({
    type: "ADD_NEW_COMMENT",
    payload: { ...newComment, uuid: uuid() }
  });
};
