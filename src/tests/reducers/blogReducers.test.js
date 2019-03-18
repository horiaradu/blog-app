import blogReducers from '../../redux/reducers/blogReducers';

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

  test('should not not add comments to news', () => {
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
});
