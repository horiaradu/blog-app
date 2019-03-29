import React from 'react';
import { shallow } from 'enzyme';
import Post from '../../components/Post';
import toJSON from 'enzyme-to-json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('Post Component', () => {
  it('should render Post component correctly', () => {
    const post = {
      comments: [],
      entry: {
        title: 'title',
        body: 'body text',
        tags: ['tag1', 'tag2']
      }
    };
    const auth = { uid: '123' };
    const wrapper = shallow(
      <Post post={post} auth={auth} profile={{ firstName: 'Tony' }} users={[{ firstName: 'Tony' }]} />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(post.entry.tags[0]).toBe('tag1');
  });
  it('should not render tags if no tags provided', () => {
    const post = {
      comments: [],
      entry: {
        title: 'title',
        body: 'body text',
        tags: []
      }
    };
    const auth = { uid: '123' };
    const wrapper = shallow(<Post post={post} auth={auth} users={[{ firstName: 'Tony' }]} />);
    expect(wrapper.find('li').length).toBe(0);
  });
});
