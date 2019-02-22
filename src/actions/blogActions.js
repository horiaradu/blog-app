export const addTag = tag => dispatch => {
  dispatch({
    type: "ADD_TAG",
    payload: tag
  });
};
