import api from '../../services/api';

export const signIn = userCredentials => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS', userCredentials });
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
};

export const signUp = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        return firestore
          .collection('users')
          .doc(response.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            userId: response.user.uid
          });
      })
      .then(async () => {
        const snapshot = await firebase
          .firestore()
          .collection('users')
          .get();
        return snapshot.docs.map(entry => entry.data());
      })
      .then(users => {
        dispatch({
          type: 'SIGNUP_SUCCESS',
          users
        });
      })
      .catch(err => {
        dispatch({
          type: 'SIGNUP_ERROR',
          err
        });
      });
  };
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });
};

export const fetchUsers = () => async dispatch => {
  const users = await api.fetchUsers();
  dispatch({
    type: 'FETCH_USERS',
    users
  });
};
