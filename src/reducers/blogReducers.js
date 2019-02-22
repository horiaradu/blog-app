const initialState = {
  tags: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_TAG":
      return {
        ...state,
        tags: state.tags.concat(action.payload)
      };
    default:
      return state;
  }
}
