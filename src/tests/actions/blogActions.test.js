import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchEntries } from '../../redux/actions/blogActions';
import api from '../../services/api';
import { SET_ENTRIES } from '../../redux/actions/actionTypes';

const middlewares = [thunk];
const mockStoreCreator = configureStore(middlewares);

jest.mock('../../services/api');

describe('blogActions', () => {
  describe('fetchEntries()', () => {
    test('dispatches SET_ENTRIES with the entries from the api', async () => {
      const store = mockStoreCreator({});

      const fetchEntriesMock = () => Promise.resolve([]);
      api.fetchEntries.mockImplementation(fetchEntriesMock);

      await store.dispatch(fetchEntries());
      const dispatchedActions = store.getActions();

      expect(dispatchedActions.length).toEqual(1);
      expect(dispatchedActions[0]).toEqual({ type: SET_ENTRIES, payload: [] });
    });

    test('reverses the actions', async () => {
      const store = mockStoreCreator({});

      const fetchEntriesMock = () => Promise.resolve([{ uuid: '123' }, { uuid: '456' }]);
      api.fetchEntries.mockImplementation(fetchEntriesMock);

      await store.dispatch(fetchEntries());
      const dispatchedActions = store.getActions();

      expect(dispatchedActions.length).toEqual(1);
      expect(dispatchedActions[0]).toEqual({ type: SET_ENTRIES, payload: [{ uuid: '456' }, { uuid: '123' }] });
    });
  });
});
