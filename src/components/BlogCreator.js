import React, { Component } from "react";
import { addNewEntry } from "../actions/blogActions";
import { connect } from "react-redux";

class BlogCreator extends Component {
  state = {
    title: "",
    body: "",
    tag: "",
    entryType: "",
    tags: []
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRadioChange = e => {
    this.setState({ entryType: e.target.value });
  };

  onFormSubmit = e => {
    const { title, body, entryType, tags } = this.state;
    const newEntry = {
      title,
      body,
      entryType,
      tags
    };
    e.preventDefault();
    this.props.addNewEntry(newEntry);

    this.setState({
      title: "",
      body: "",
      entryType: "",
      tag: "",
      tags: []
    });
  };

  onTagFormSubmit = e => {
    e.preventDefault();
    this.setState({ tags: this.state.tags.concat(this.state.tag) });
    this.state.tag = "";
  };

  render() {
    const { title, body, tag, tags } = this.state;
    return (
      <div>
        <h1>Create Entry</h1>
        <div>
          <form onSubmit={this.onFormSubmit}>
            <input
              type="radio"
              id="post"
              name="entryType"
              value="post"
              onChange={this.onRadioChange}
            />
            <label htmlFor="post">Post</label>
            <input
              type="radio"
              id="news"
              name="entryType"
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
              <div>
                <input type="submit" value="Save" />
              </div>
            </div>
          </form>
          <div>
            <form onSubmit={this.onTagFormSubmit}>
              <label htmlFor="tags">Tags:</label>
              <input
                type="text"
                id="tag"
                name="tag"
                placeholder="Insert a tag"
                value={tag}
                onChange={this.onInputChange}
              />
            </form>
            <ul>
              {tags.map(tag => (
                <li>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addNewEntry }
)(BlogCreator);
