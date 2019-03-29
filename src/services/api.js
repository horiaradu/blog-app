import firebase from 'firebase';

const api = {
  async fetchEntries() {
    const snapshot = await firebase
      .firestore()
      .collection('entries')
      .orderBy('entryDate')
      .get();
    return snapshot.docs.map(entry => entry.data());
  },
  async fetchUsers() {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .get();
    return snapshot.docs.map(user => user.data());
  },

  async createEntry(entry) {
    const newEntry = {
      entry: entry,
      comments: [],
      entryDate: new Date().toLocaleString()
    };

    await firebase
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
        return {
          entry: entry.data().entry,
          comments: entry.data().comments
        };
      }
    });
  },

  async deleteEntry(entryUuid) {
    const snapshot = await firebase
      .firestore()
      .collection('entries')
      .get();

    const firebaseEntryToDelete = snapshot.docs.find(firebaseEntry => firebaseEntry.data().entry.uuid === entryUuid);

    if (firebaseEntryToDelete) {
      const snapshott = await firebase
        .firestore()
        .collection('entries')
        .doc(firebaseEntryToDelete.id);
      snapshott.delete();
    }
  },
  async updateEntry(id, data, userId) {
    const snapshot = await firebase
      .firestore()
      .collection('entries')
      .get();

    snapshot.docs.map(entry => {
      if (entry.data().entry.uuid === id) {
        firebase
          .firestore()
          .collection('entries')
          .doc(entry.id)
          .update({
            entry: { ...data, uuid: id, userId }
          });
        return {
          entry: entry.data().entry
        };
      } else {
        return {
          entry: entry.data().entry
        };
      }
    });
  },
  async deleteComment(commentUuid, entryUuid) {
    const snapshot = await firebase
      .firestore()
      .collection('entries')
      .get();
    let commentsArray = [];
    snapshot.docs.map(x => {
      return x.data().comments.map(comment => {
        return (commentsArray = commentsArray.concat(comment));
      });
    });

    const filteredComments = commentsArray.filter(comment => comment.uuid !== commentUuid);

    snapshot.docs.map(entry => {
      if (entry.data().entry.uuid === entryUuid) {
        firebase
          .firestore()
          .collection('entries')
          .doc(entry.id)
          .update({
            comments: filteredComments
          });
      }
      return filteredComments;
    });
  }
};

export default api;
