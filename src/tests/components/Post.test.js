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
      entry: {}
    };
    const wrapper = shallow(<Post post={post} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
