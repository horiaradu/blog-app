import blogReducers from '../../redux/reducers/blogReducers';
import { UPDATE_ENTRY } from '../../redux/actions/actionTypes';

describe('blogReducers', () => {
  test('should setup default blogs state', () => {
    const state = blogReducers({ entries: [] }, { type: '@@INIT' });
    expect(state).toEqual({
      entries: []
    });
  });

  test('should return initial state if no action', () => {
    const state = blogReducers({ entries: [] }, { type: 'no_type' });
    expect(state).toEqual({ entries: [] });
  });

  test('should populate state with fetched data when state is empty', () => {
    const action = {
      type: 'SET_ENTRIES',
      payload: [
        {
          comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
          entry: { body: 'some text', entryType: 'post' }
        },
        {
          comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
          entry: { body: 'some other text', entryType: 'news' }
        }
      ]
    };
    const state = blogReducers({ entries: [] }, action);
    expect(state.entries).toEqual([
      {
        comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
        entry: { body: 'some text', entryType: 'post' }
      },
      {
        comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
        entry: { body: 'some other text', entryType: 'news' }
      }
    ]);
  });

  test('should populate state with fetched data when state has data', () => {
    const state = {
      entries: [
        {
          comments: [{ author: 'another dave', text: 'nice' }, { author: 'john', text: 'cool' }],
          entry: { body: 'some text', entryType: 'post' }
        },
        {
          comments: [{ author: 'another tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
          entry: { body: 'some other text', entryType: 'news' }
        }
      ]
    };
    const action = {
      type: 'SET_ENTRIES',
      payload: [
        {
          comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
          entry: { body: 'some text', entryType: 'post' }
        },
        {
          comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
          entry: { body: 'some other text', entryType: 'news' }
        },
        {
          comments: [{ author: 'test', text: 'test' }, { author: 'test2', text: 'test2' }],
          entry: { body: 'some test', entryType: 'post' }
        }
      ]
    };
    const newState = blogReducers(state, action);
    expect(newState.entries).toEqual([
      {
        comments: [{ author: 'dave', text: 'nice' }, { author: 'john', text: 'cool' }],
        entry: { body: 'some text', entryType: 'post' }
      },
      {
        comments: [{ author: 'tony', text: 'super' }, { author: 'michael', text: 'awesome' }],
        entry: { body: 'some other text', entryType: 'news' }
      },
      {
        comments: [{ author: 'test', text: 'test' }, { author: 'test2', text: 'test2' }],
        entry: { body: 'some test', entryType: 'post' }
      }
    ]);
  });

  test('should add new entry', () => {
    const state = {
      entries: [
        { entry: { title: 'blog1', body: 'some text1', entryType: 'news' } },
        { entry: { title: 'blog2', body: 'some text2', entryType: 'post' }, comments: [] }
      ]
    };
    const action = {
      type: 'ADD_NEW_ENTRY',
      payload: { title: 'blog3', body: 'some text3', entryType: 'post' }
    };
    const newState = blogReducers(state, action);
    expect(newState).toEqual({
      entries: [
        { comments: [], entry: { title: 'blog3', body: 'some text3', entryType: 'post' } },
        { entry: { title: 'blog1', body: 'some text1', entryType: 'news' } },
        { comments: [], entry: { title: 'blog2', body: 'some text2', entryType: 'post' } }
      ]
    });
  });

  test('should add comments to blog posts', () => {
    const state = {
      entries: [
        { entry: { title: 'blog1', body: 'some text1', entryType: 'news' } },
        { entry: { title: 'blog2', body: 'some text2', entryType: 'post' }, comments: [] }
      ]
    };
    const action = {
      type: 'ADD_NEW_ENTRY',
      payload: { title: 'blog3', body: 'some text3', entryType: 'post' }
    };

    const newState = blogReducers(state, action);
    expect(newState).toEqual({
      entries: [
        { comments: [], entry: { title: 'blog3', body: 'some text3', entryType: 'post' } },
        { entry: { title: 'blog1', body: 'some text1', entryType: 'news' } },
        { comments: [], entry: { title: 'blog2', body: 'some text2', entryType: 'post' } }
      ]
    });
  });

  test('should not add comments to news', () => {
    const state = {
      entries: [
        { entry: { title: 'blog1', body: 'some text1', entryType: 'news' } },
        { entry: { title: 'blog2', body: 'some text2', entryType: 'post' }, comments: [] }
      ]
    };
    const action = {
      type: 'ADD_NEW_ENTRY',
      payload: { title: 'blog3', body: 'some text3', entryType: 'news' }
    };

    const newState = blogReducers(state, action);
    expect(newState).toEqual({
      entries: [
        { entry: { title: 'blog3', body: 'some text3', entryType: 'news' } },
        { entry: { title: 'blog1', body: 'some text1', entryType: 'news' } },
        { comments: [], entry: { title: 'blog2', body: 'some text2', entryType: 'post' } }
      ]
    });
  });

  test('should add a new comment to an existing blog with existing comment', () => {
    const currentState = {
      entries: [
        {
          entry: { title: 'blo1', body: 'some text', entryType: 'post', uuid: 1 },
          comments: [{ author: 'dave', text: 'old comment' }]
        }
      ]
    };
    const action = {
      type: 'ADD_NEW_COMMENT',
      payload: { author: 'john', text: 'new comment' },
      postUuid: 1
    };
    const state = blogReducers(currentState, action);
    expect(state).toEqual({
      entries: [
        {
          entry: { title: 'blo1', body: 'some text', entryType: 'post', uuid: 1 },
          comments: [{ author: 'dave', text: 'old comment' }, { author: 'john', text: 'new comment' }]
        }
      ]
    });
  });

  test('should not add a comment if there is no blog', () => {
    const currentState = { entries: [] };
    const action = {
      type: 'ADD_NEW_COMMENT',
      payload: { author: 'john', text: 'new comment' },
      postUuid: 1
    };
    const state = blogReducers(currentState, action);
    expect(state).toEqual(state);
  });

  test('should not add comment if the id doesn not match', () => {
    const currentState = {
      entries: [
        {
          entry: { title: 'blo1', body: 'some text', entryType: 'post', uuid: 1 },
          comments: [{ author: 'dave', text: 'old comment' }]
        }
      ]
    };
    const action = {
      type: 'ADD_NEW_COMMENT',
      payload: { author: 'john', text: 'new comment' },
      postUuid: 2
    };
    const state = blogReducers(currentState, action);
    expect(state).toEqual({
      entries: [
        {
          entry: { title: 'blo1', body: 'some text', entryType: 'post', uuid: 1 },
          comments: [{ author: 'dave', text: 'old comment' }]
        }
      ]
    });
  });
  describe('DELETE_ENTRY', () => {
    it('should delete an entry and make a new state with the filtered entries', () => {
      const currentState = {
        entries: [
          { entry: { title: 'some title', uuid: '1' }, comments: [] },
          { entry: { title: 'another title', uuid: '2' }, comments: [] }
        ]
      };
      const action = {
        type: 'DELETE_ENTRY',
        payload: '1'
      };
      const state = blogReducers(currentState, action);
      expect(state).toEqual({
        entries: [{ entry: { title: 'another title', uuid: '2' }, comments: [] }]
      });
    });
  });
  describe('UPDATE_ENTRY', () => {
    it('should update state with the updatedEntry', () => {
      const currentState = {
        entries: [
          { entry: { title: 'first entry', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry', entryType: 'post', uuid: '2' }, comments: [] }
        ]
      };
      const action = {
        type: UPDATE_ENTRY,
        entryUuidToUpdate: '1',
        updatedEntry: { title: 'first entry updated', entryType: 'post', uuid: '1' }
      };
      const state = blogReducers(currentState, action);
      expect(state).toEqual({
        entries: [
          { entry: { title: 'first entry updated', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry', entryType: 'post', uuid: '2' }, comments: [] }
        ]
      });
    });
    it('should return entry from state if uuid does not match', () => {
      const currentState = {
        entries: [
          { entry: { title: 'first entry', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry', entryType: 'post', uuid: '2' }, comments: [] }
        ]
      };
      const action = {
        type: UPDATE_ENTRY,
        entryUuidToUpdate: '3',
        updatedEntry: { title: 'first entry updated', entryType: 'post', uuid: '3' }
      };
      const state = blogReducers(currentState, action);
      expect(state).toEqual({
        entries: [
          { entry: { title: 'first entry', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry', entryType: 'post', uuid: '2' }, comments: [] }
        ]
      });
    });
    it('should have comment key if entry type is "post" or updated to "post"', () => {
      const currentState = {
        entries: [
          { entry: { title: 'first entry', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry', entryType: 'news', uuid: '2' } }
        ]
      };
      const action = {
        type: UPDATE_ENTRY,
        entryUuidToUpdate: '2',
        updatedEntry: { title: 'second entry updated', entryType: 'post', uuid: '2' }
      };
      const state = blogReducers(currentState, action);
      expect(state).toEqual({
        entries: [
          { entry: { title: 'first entry', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry updated', entryType: 'post', uuid: '2' }, comments: [] }
        ]
      });
    });
    it('should not have comment key if entry type is "news" or updated to "news" ', () => {
      const currentState = {
        entries: [
          { entry: { title: 'first entry', entryType: 'post', uuid: '1' }, comments: [] },
          { entry: { title: 'second entry', entryType: 'news', uuid: '2' } }
        ]
      };
      const action = {
        type: UPDATE_ENTRY,
        entryUuidToUpdate: '1',
        updatedEntry: { title: 'first entry updated', entryType: 'news', uuid: '1' }
      };
      const state = blogReducers(currentState, action);
      expect(state).toEqual({
        entries: [
          { entry: { title: 'first entry updated', entryType: 'news', uuid: '1' } },
          { entry: { title: 'second entry', entryType: 'news', uuid: '2' } }
        ]
      });
    });
  });
});
