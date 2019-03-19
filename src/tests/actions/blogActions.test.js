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
    afterEach(() => jest.resetAllMocks());
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
    afterEach(() => jest.resetAllMocks());
    test('checks if dispatches ADD_NEW_ENTRY with correct payload', () => {
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
        title: 'some title',
        body: 'some text',
        entryType: 'post'
      };

      const uuidTest = 'id_test1234';

      const fetchEntriesMock = () =>
        Promise.resolve({ title: 'some title', body: 'some text', entryType: 'post', uuid: uuidTest });
      api.createEntry.mockImplementation(fetchEntriesMock);
      store.dispatch(addNewEntry(newEntry));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.length).toBe(1);
      expect(dispatchedActions[0].type).toBe('ADD_NEW_ENTRY');

      expect(dispatchedActions[0].payload).toMatchObject({
        title: 'some title',
        body: 'some text',
        entryType: 'post',
        uuid: expect.any(String)
      });
    });
    test('checks if api.createEntry() was called', () => {
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
        title: 'some title',
        body: 'some text',
        entryType: 'post'
      };

      const uuidTest = 'id_test1234';

      const createEntryMock = () =>
        Promise.resolve({ title: 'some title', body: 'some text', entryType: 'post', uuid: uuidTest });
      api.createEntry.mockImplementation(createEntryMock);
      store.dispatch(addNewEntry(newEntry));
      expect(api.createEntry).lastCalledWith({
        title: 'some title',
        body: 'some text',
        entryType: 'post',
        uuid: expect.any(String)
      });
    });
  });
  describe('addNewComment()', () => {
    afterEach(() => jest.resetAllMocks());
    test('dispaches ADD_NEW_COMMENT with correct payload', () => {
      const store = mockStoreCreator({
        entries: [
          {
            comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
            entry: { body: 'some text', entryType: 'post' },
            uuid: '123abc'
          },
          {
            comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
            entry: { body: 'some other text', entryType: 'news' },
            uuid: '1234'
          }
        ]
      });
      const newComment = { author: 'new author', text: 'new comment' };
      const postUuid = '123abc';
      store.dispatch(addNewComment(newComment, postUuid));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.length).toBe(1);
      expect(dispatchedActions[0].type).toBe('ADD_NEW_COMMENT');
      expect(dispatchedActions[0].postUuid).toBe('123abc');
      expect(dispatchedActions[0].payload).toMatchObject({
        author: 'new author',
        text: 'new comment',
        uuid: expect.any(String)
      });
    });
    test('checks if api.createComment() was successfully called', () => {
      const store = mockStoreCreator({
        entries: [
          {
            comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
            entry: { body: 'some text', entryType: 'post' },
            uuid: '123abcd'
          },
          {
            comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
            entry: { body: 'some other text', entryType: 'news' },
            uuid: '1234'
          }
        ]
      });
      const postUuid = '123abcd';
      const newComment = {
        author: 'john',
        text: 'a new comment'
      };

      const createCommentMock = () =>
        Promise.resolve(
          {
            author: 'john',
            text: 'a new comment'
          },
          postUuid
        );
      api.createComment.mockImplementation(createCommentMock);
      store.dispatch(addNewComment(newComment, postUuid));
      const dispatchedActions = store.getActions();
      console.log(dispatchedActions);
      expect(api.createComment).lastCalledWith(
        {
          author: 'john',
          text: 'a new comment',
          uuid: expect.any(String)
        },
        expect.any(String)
      );
    });
  });
});
