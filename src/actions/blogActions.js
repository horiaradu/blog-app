import uuid from "uuid";

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
