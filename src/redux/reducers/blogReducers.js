import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, SET_ENTRIES, DELETE_ENTRY, UPDATE_ENTRY } from '../actions/actionTypes';

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
      const filteredEntries = state.entries.filter(entry => entryUuid !== entry.entry.uuid);
      return {
        ...state,
        entries: filteredEntries
      };
    case UPDATE_ENTRY:
      const { entryUuidToUpdate, updatedEntry } = action;
      const newState = state.entries.map(x => {
        if (x.entry.uuid === entryUuidToUpdate) {
          if (updatedEntry.entryType === 'post') {
            return {
              entry: { ...updatedEntry },
              comments: x.comments && x.comments.length ? x.comments : []
            };
          } else {
            return {
              entry: { ...updatedEntry }
            };
          }
        } else return x;
      });

      return {
        ...state,
        entries: newState
      };
    case 'DELETE_COMMENT':
      const { entryUuid2, listOfFilteredComments } = action;
      const newState2 = state.entries.map(x => {
        if (x.entry.uuid === entryUuid2) {
          return {
            entry: x.entry,
            comments: listOfFilteredComments
          };
        } else return x;
      });

      return {
        ...state,
        entries: newState2
      };
    default:
      return state;
  }
}
