const initialState = {
  authError: null,
  users: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login Failed'
      };
    case 'SIGNOUT_SUCCESS':
      return {
        ...state
      };
    case 'SIGNUP_SUCCESS':
      const users = action.users;
      return {
        ...state,
        authError: null,
        users: users
      };
    case 'SINGUP_ERROR':
      return {
        ...state,
        authError: action.err
      };
    case 'FETCH_USERS':
      const fetchedUsers = action.users;
      return {
        ...state,
        users: fetchedUsers
      };
    default:
      return state;
  }
};

export default authReducer;
