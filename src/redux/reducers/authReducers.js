const initialState = {
  authError: null
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
        state
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'SINGUP_ERROR':
      return {
        ...state,
        authError: action.err
      };
    default:
      return state;
  }
};

export default authReducer;
