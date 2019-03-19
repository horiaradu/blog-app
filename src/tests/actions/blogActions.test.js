import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchEntries, addNewEntry, addNewComment } from '../../redux/actions/blogActions';
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

  describe('addNewEntry()', () => {
    test('dispaches ADD_NEW_ENTRY', () => {
      const store = mockStoreCreator({
        entries: [
          {
            comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
            entry: { body: 'some text', entryType: 'post' }
          },
          {
            comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
            entry: { body: 'some other text', entryType: 'news' }
          }
        ]
      });

      const newEntry = {
        comments: [{ author: 'another dave', text: 'nice' }, { author: 'john', text: 'cool' }],
        entry: { body: 'some text', entryType: 'post' },
        uuid: '123abc'
      };
      store.dispatch(addNewEntry(newEntry));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.length).toBe(1);
      expect(dispatchedActions[0].type).toBe('ADD_NEW_ENTRY');
    });
    test('checks if action type is ADD_NEW_ENTRY', () => {
      const store = mockStoreCreator({
        entries: [
          {
            comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
            entry: { body: 'some text', entryType: 'post' }
          },
          {
            comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
            entry: { body: 'some other text', entryType: 'news' }
          }
        ]
      });
      const newEntry = {
        comments: [{ author: 'another dave', text: 'nice' }, { author: 'john', text: 'cool' }],
        entry: { body: 'some text', entryType: 'post' },
        uuid: '123abc'
      };
      store.dispatch(addNewEntry(newEntry));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0].type).toBe('ADD_NEW_ENTRY');
    });

    test('checks if action payload is correct and there is uuid', () => {
      const store = mockStoreCreator({
        entries: []
      });
      const newEntry = {
        comments: [{ author: 'another dave', text: 'nice' }, { author: 'john', text: 'cool' }],
        entry: { body: 'some text', entryType: 'post' }
      };
      store.dispatch(addNewEntry(newEntry));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0].payload).toMatchObject({
        comments: [{ author: 'another dave', text: 'nice' }, { author: 'john', text: 'cool' }],
        entry: { body: 'some text', entryType: 'post' },
        uuid: expect.any(String)
      });
    });
  });
  describe('addNewComment()', () => {
    test('dispaches ADD_NEW_ENTRY and its type is ADD_NEW_ENTRY', () => {
      const store = mockStoreCreator({
        entries: [
          {
            comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
            entry: { body: 'some text', entryType: 'post' },
            uuid: '1'
          },
          {
            comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
            entry: { body: 'some other text', entryType: 'news' },
            uuid: '1234'
          }
        ]
      });

      const newComment = { author: 'new author', text: 'new comment', uuid: '1' };
      const postUuid = '1';
      store.dispatch(addNewComment(newComment, postUuid));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.length).toBe(1);
      expect(dispatchedActions[0].type).toBe('ADD_NEW_COMMENT');
    });
    test('checks if action.payload is correct and it has uuid', () => {
      const store = mockStoreCreator({ entries: [] });
      const newComment = { author: 'new author', text: 'new comment' };
      const postUuid = '1';
      store.dispatch(addNewComment(newComment, postUuid));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0].payload).toMatchObject({
        author: 'new author',
        text: 'new comment',
        uuid: expect.any(String)
      });
    });
    test('checks if postUuid was successfully found', () => {
      const store = mockStoreCreator({
        entries: [
          {
            comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
            entry: { body: 'some text', entryType: 'post' },
            uuid: '123abc'
          }
        ]
      });
      const newComment = { author: 'new author', text: 'new comment' };
      const postUuid = '123abc';
      store.dispatch(addNewComment(newComment, postUuid));
      const dispatchedActions = store.getActions();
      console.log(dispatchedActions);
      expect(dispatchedActions[0].postUuid).toBe('123abc');
    });
  });
});
