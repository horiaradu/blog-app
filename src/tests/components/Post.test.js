import React from 'react';
import { shallow } from 'enzyme';
import Post from '../../components/Post';
import toJSON from 'enzyme-to-json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('Post Component', () => {
  test('should render Post component correctly', () => {
    const post = {
      comments: [],
      entry: {
        title: 'title',
        body: 'body text',
        tags: ['tag1', 'tag2']
      }
    };
    const wrapper = shallow(<Post post={post} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('li').length).toBeGreaterThan(0);
  });
  test('should not render tags if no tags provided', () => {
    const post = {
      comments: [],
      entry: {
        title: 'title',
        body: 'body text',
        tags: []
      }
    };
    const wrapper = shallow(<Post post={post} />);
    expect(wrapper.find('li').length).toBe(0);
  });
});
