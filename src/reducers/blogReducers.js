const initialState = {
  blogs: [],
  comments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NEW_ENTRY':
      return {
        ...state,
        blogs: [action.payload, ...state.blogs]
      };

    case 'ADD_NEW_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };

    case 'ADD_ENTRIES_TO_LOCAL_STORAGE':
      if (!JSON.parse(localStorage.getItem('entries'))) {
        localStorage.setItem('entries', JSON.stringify(state.blogs));
        return {
          ...state.blogs
        };
      } else if (state.blogs.length === 1) {
        const localStoreageOldPosts = JSON.parse(localStorage.getItem('entries'));
        const newLocalStorage = localStoreageOldPosts.concat(state.blogs);
        localStorage.setItem('entries', JSON.stringify(newLocalStorage));
        return {
          ...state,
          blogs: newLocalStorage
        };
      } else {
        const localStoreageOldPosts = JSON.parse(localStorage.getItem('entries'));
        const newLocalStorage = localStoreageOldPosts.concat(state.blogs.slice(0, 1));
        localStorage.setItem('entries', JSON.stringify(newLocalStorage));
        return {
          ...state,
          blogs: newLocalStorage
        };
      }

    case 'FETCH_ENTRIES':
      if (localStorage.getItem('entries')) {
        const localStorageData = JSON.parse(localStorage.getItem('entries'));
        return {
          ...state,
          blogs: localStorageData
        };
      }
      return {
        ...state
      };

    default:
      return state;
  }
}
