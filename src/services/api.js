// here, we don't talk about state, actions, reducers, UI
// here, we only have local storage
import firebase from 'firebase';

const api = {
  async fetchEntries() {
    const snapshot = await firebase
      .firestore()
      .collection('entries')
      .get();
    return snapshot.docs.map(entry => entry.data());
  },

  createEntry(entry) {
    const newEntry = {
      entry: entry,
      comments: []
    };

    firebase
      .firestore()
      .collection('entries')
      .add(newEntry);
  },

  async createComment(comment, postUuid) {
    const snapshot = await firebase
      .firestore()
      .collection('entries')
      .get();

    snapshot.docs.map(entry => {
      if (entry.data().entry.uuid === postUuid) {
        firebase
          .firestore()
          .collection('entries')
          .doc(entry.id)
          .update({
            entry: entry.data().entry,
            comments: entry.data().comments.concat(comment)
          });
        return {
          entry: entry.data().entry,
          comments: entry.data().comments.concat(comment)
        };
      } else {
        firebase
          .firestore()
          .collection('entries')
          .doc(entry.id)
          .update({
            entry: entry.data().entry,
            comments: entry.data().comments
          });
        return {
          entry: entry.data().entry,
          comments: entry.data().comments
        };
      }
    });
  }
};

export default api;
