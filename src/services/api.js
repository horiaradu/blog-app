export const addEntriesToLocalStorage = state => {
  try {
    const entries = JSON.stringify(state);
    localStorage.setItem('entries', entries);
  } catch (err) {
    console.log('err');
  }
};

export const fetchEntries = () => {
  try {
    const dataFromLocalStorage = localStorage.getItem('entries');
    if (dataFromLocalStorage === null) {
      return undefined;
    }
    return JSON.parse(dataFromLocalStorage);
  } catch (err) {
    return undefined;
  }
};
