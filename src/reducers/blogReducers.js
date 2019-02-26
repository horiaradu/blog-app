const initialState = {
  blogs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_ENTRY":
      return {
        ...state,
        blogs: [action.payload, ...state.blogs]
      };
    default:
      return state;
  }
}
