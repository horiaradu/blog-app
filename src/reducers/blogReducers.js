const initialState = {
  blogs: [],
  comments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_ENTRY":
      return {
        ...state,
        blogs: [action.payload, ...state.blogs]
      };
    case "ADD_NEW_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    default:
      return state;
  }
}
