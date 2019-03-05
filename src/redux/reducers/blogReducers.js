import { ADD_NEW_ENTRY, ADD_NEW_COMMENT, ADD_ENTRIES_TO_LS } from '../actions/actionTypes';

const initialState = {
  entries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_ENTRY:
      if (action.payload.entryType === 'post') {
        return {
          ...state,
          entries: [...state.entries, { entry: action.payload, comments: [] }]
        };
      } else {
        return {
          ...state,
          entries: [...state.entries, { entry: action.payload }]
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

    case ADD_ENTRIES_TO_LS:
      return {
        ...state
      };

    // case 'ADD_ENTRIES_TO_LOCAL_STORAGE':
    //   localStorage.setItem('entries', JSON.stringify(state.blogs));
    //   return {
    //     ...state,
    //     blogs: state.blogs
    //   };

    // case 'ADD_COMMENTS_TO_LOCAL_STORAGE':
    //   localStorage.setItem('comments', JSON.stringify(state.comments));
    //   return {
    //     ...state,
    //     comments: state.comments
    //   };

    // } else if (state.blogs.length === 1) {
    //   const localStoreageOldPosts = JSON.parse(localStorage.getItem('entries'));
    //   const newPostsLocalStorage = localStoreageOldPosts.blogs.concat(state.blogs);
    //   console.log(newLocalStorage);
    //   localStorage.setItem('entries', JSON.stringify(newPostsLocalStorage));
    //   return {
    //     ...state,
    //     blogs: newPostsLocalStorage
    //   };
    // } else {
    //   const localStoreageOldPosts = JSON.parse(localStorage.getItem('entries'));
    //   const newLocalStorage = localStoreageOldPosts.concat(state.blogs.slice(0, 1));
    //   localStorage.setItem('entries', JSON.stringify(newLocalStorage));
    //   return {
    //     ...state,
    //     blogs: newLocalStorage
    //   };
    // }

    default:
      return state;
  }
}
