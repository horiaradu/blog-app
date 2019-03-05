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
    const newEntries = existingEntries.concat(entry);
    localStorage.setItem('entries', JSON.stringify(newEntries));
  }

  // TODO: createComment(...) {
  //   ...
  // }
};

export default api;
