import React, { Component } from "react";

class BlogCreator extends Component {
  state = {
    title: "",
    body: "",
    tag: "",
    entry: ""
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRadioChange = e => {
    this.setState({ entry: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { title, body, tag } = this.state;
    return (
      <div>
        <h1>Create Entry</h1>
        <div>
          <form onSubmit={this.onFormSubmit}>
            <input
              type="radio"
              id="post"
              name="entry"
              value="post"
              onChange={this.onRadioChange}
            />
            <label htmlFor="post">Post</label>

            <input
              type="radio"
              id="news"
              name="entry"
              value="news"
              onChange={this.onRadioChange}
            />
            <label htmlFor="news">News</label>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Name"
                value={title}
                onChange={this.onInputChange}
              />
              <label htmlFor="body">Body:</label>
              <textarea
                type="text"
                id="body"
                name="body"
                placeholder="Body"
                value={body}
                onChange={this.onInputChange}
              />
              <label htmlFor="tags">Tags:</label>
              <input
                type="text"
                id="tag"
                name="tag"
                placeholder="Insert a tag"
                value={tag}
                onChange={this.onInputChange}
              />
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default BlogCreator;
