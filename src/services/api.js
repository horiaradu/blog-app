// here, we don't talk about state, actions, reducers, UI
// here, we only have local storage

const api = {
  fetchEntries() {
    const dataFromLocalStorage = localStorage.getItem('entries');
    if (dataFromLocalStorage === null) {
      return [];
    }
    return JSON.parse(dataFromLocalStorage);
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
  }

  // TODO: createComment(...) {
};

export default api;
