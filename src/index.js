import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<App />, document.querySelector('#root'));
});
