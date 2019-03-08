import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
