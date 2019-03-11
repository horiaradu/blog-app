import { combineReducers } from 'redux';
import blogReducer from './blogReducers';
import authReducer from './authReducers';

export default combineReducers({
  blog: blogReducer,
  auth: authReducer
});
