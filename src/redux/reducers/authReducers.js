const initialState = {
  authError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('LOGIN_SUCCESS');
      return {
        ...state
      };
    case 'LOGIN_ERROR':
      console.log('LOGIN_ERROR');
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer;
