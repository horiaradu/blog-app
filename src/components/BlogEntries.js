import React, { Component } from 'react';
import Post from './Post';
import News from './News';
import EntriesFilter from './EntriesFilter';

class BlogEntries extends Component {
  state = {
    postCheck: true,
    newsCheck: true
  };

  changePostCheck = () => {
    this.setState({ postCheck: !this.state.postCheck });
  };

  changeNewsCheck = () => {
    this.setState({ newsCheck: !this.state.newsCheck });
  };

  render() {
    const { blogs } = this.props;
    return (
      <div>
        <EntriesFilter
          filter={this.state}
          changePostCheck={this.changePostCheck}
          changeNewsCheck={this.changeNewsCheck}
        />
        <div>
          {(blogs && this.state.postCheck === true) || this.state.newsCheck === true ? (
            blogs.map(blog => {
              if (blog.entry.entryType === 'post' && this.state.postCheck === true) {
                return <Post key={blog.entry.uuid} post={blog} />;
              } else if (blog.entry.entryType === 'news' && this.state.newsCheck === true) {
                return <News key={blog.entry.uuid} news={blog} />;
              } else return null;
            })
          ) : blogs && this.state.postCheck === false && this.state.newsCheck === false ? (
            <h4>You've deselected both news and posts</h4>
          ) : null}
        </div>
      </div>
    );
  }
}

export default BlogEntries;
