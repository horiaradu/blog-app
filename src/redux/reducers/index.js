import { combineReducers } from 'redux';
import blogReducer from './blogReducers';

export default combineReducers({
  blog: blogReducer
});
