export const addNewEntry = newEntry => dispatch => {
  dispatch({
    type: "ADD_NEW_ENTRY",
    payload: newEntry
  });
};
