import React from 'react';
import { shallow } from 'enzyme';
import Post from '../../components/Post';
import toJSON from 'enzyme-to-json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('Post Component', () => {
  it('should render Post component correctly', () => {
    const blog = {
      comments: [],
      entry: {
        title: 'title',
        body: 'body text',
        tags: ['tag1', 'tag2'],
        uuid: '123456'
      }
    };
    const currentUser = {
      firstName: 'Tony',
      userId: '999'
    };
    const users = [
      {
        firstName: 'Tony',
        userId: '999'
      }
    ];

    const wrapper = shallow(<Post key={blog.entry.uuid} post={blog} currentUser={currentUser} users={users} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(blog.entry.tags[0]).toBe('tag1');
  });
  it('should not render tags if no tags provided', () => {
    const blog = {
      comments: [],
      entry: {
        title: 'title',
        body: 'body text',
        tags: [],
        uuid: '123456'
      }
    };
    const currentUser = {
      firstName: 'Tony',
      userId: '999'
    };
    const users = [
      {
        firstName: 'Tony',
        userId: '999'
      }
    ];

    const wrapper = shallow(<Post key={blog.entry.uuid} post={blog} currentUser={currentUser} users={users} />);
    expect(wrapper.find('li').length).toBe(0);
  });
});
