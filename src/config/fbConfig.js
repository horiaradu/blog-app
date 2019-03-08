import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAn-YzpTwZxkwi8JVOOKo4795dRfPASHAo',
  authDomain: 'blog-app-database.firebaseapp.com',
  databaseURL: 'https://blog-app-database.firebaseio.com',
  projectId: 'blog-app-database',
  storageBucket: 'blog-app-database.appspot.com',
  messagingSenderId: '16480624976'
};

firebase.initializeApp(config);

export default firebase;
