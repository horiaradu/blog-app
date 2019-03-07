// here, we don't talk about state, actions, reducers, UI
// here, we only have local storage
import firebase from 'firebase';

const api = {
  async fetchEntries() {
    const entries = [];
    await firebase
      .firestore()
      .collection('entries')
      .get()
      .then(snapshot => {
        snapshot.docs.map(entry => entries.push({ entry: entry.data() }));
      });
    return entries;
  },

  createEntry(entry) {
    const existingEntries = this.fetchEntries();
    if (existingEntries.length === 0) {
      console.log('first if');
      const newEntries = [
        {
          entry: entry,
          comments: []
        }
      ];
      localStorage.setItem('entries', JSON.stringify(newEntries));
    } else {
      console.log('second if');
      const newEntry = {
        entry: entry,
        comments: []
      };
      const newEntries = existingEntries.concat(newEntry);

      localStorage.setItem('entries', JSON.stringify(newEntries));
    }
  },

  // TODO: createComment(...) {
  createComment(comment, postUuid) {
    const dataFromLocalStorage = this.fetchEntries();
    const newComments = dataFromLocalStorage.map(entry => {
      if (entry.entry.uuid === postUuid) {
        return {
          entry: entry.entry,
          comments: entry.comments.concat(comment)
        };
      } else {
        return {
          entry: entry.entry,
          comments: entry.comments
        };
      }
    });
    localStorage.setItem('entries', JSON.stringify(newComments));
  }
};

export default api;
