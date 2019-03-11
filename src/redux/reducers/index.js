import { combineReducers } from 'redux';
import blogReducer from './blogReducers';
import authReducer from './authReducers';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  firebase: firebaseReducer,
  blog: blogReducer,
  auth: authReducer
});
