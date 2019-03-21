import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, SET_ENTRIES, DELETE_ENTRY } from '../actions/actionTypes';

const initialState = {
  entries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ENTRIES:
      return {
        ...state,
        entries: action.payload.map(x => {
          return x;
        })
      };

    case ADD_NEW_ENTRY:
      if (action.payload.entryType === 'post') {
        return {
          ...state,
          entries: [{ entry: action.payload, comments: [] }, ...state.entries]
        };
      } else {
        return {
          ...state,
          entries: [{ entry: action.payload }, ...state.entries]
        };
      }

    case ADD_NEW_COMMENT:
      const postUuid = action.postUuid;
      const newEntries = state.entries.map(x => {
        if (x.entry.uuid === postUuid) {
          return {
            entry: x.entry,
            comments: [...x.comments, action.payload]
          };
        } else {
          return x;
        }
      });
      return {
        ...state,
        entries: newEntries
      };
    case DELETE_ENTRY:
      const entryUuid = action.payload;
      const lessEntries = state.entries.filter(entry => entryUuid !== entry.entry.uuid);
      return {
        ...state,
        entries: lessEntries
      };

    default:
      return state;
  }
}
