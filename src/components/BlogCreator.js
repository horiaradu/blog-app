import React, { Component } from "react";
import { addNewEntry } from "../actions/blogActions";
import { connect } from "react-redux";
import BarLevel from "./BarLevel";
import "../css/blogCreator.css";

class BlogCreator extends Component {
  state = {
    title: "",
    body: "",
    tag: "",
    entryType: "",
    tags: [],
    tagsError: false
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRadioChange = e => {
    this.setState({ entryType: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state.value);
    const { title, body, entryType, tags } = this.state;

    const newEntry = {
      title,
      body,
      entryType,
      tags
    };

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

    if (this.state.tags.length < 5) {
      this.setState({
        tags: this.state.tags.concat(this.state.tag),
        tag: ""
      });
    } else {
      this.setState({ tag: "", tagsError: true });
      this.setState({ tags: this.state.tags.concat(this.state.tag), tag: "" });
    }
  };

  onDeleteTag = value => {
    this.setState({
      tags: this.state.tags.filter(tag => tag !== value)
    });
    if (this.state.tags.length === 6) {
      this.setState({ tagsError: false });
    }
  };

  render() {
    const { title, body, tag, tags, entryType, tagsError } = this.state;
    return (
      <div>
        <h1 className="ui grey ui top attached header center aligned">
          Create Entry
        </h1>
        <br />
        <form className="ui form six wide field" onSubmit={this.onFormSubmit}>
          <div className="inline fields">
            <div className="field">
              <input
                type="radio"
                id="post"
                name={this.state.entryType}
                value="post"
                checked={this.state.entryType === "post"}
                onChange={this.onRadioChange}
              />
              <label htmlFor="post">
                <i class="bpost fas fa-blog"> Post</i>
              </label>
            </div>
            <div className="field">
              <input
                type="radio"
                id="news"
                name={this.state.entryType}
                value="news"
                checked={this.state.entryType === "news"}
                onChange={this.onRadioChange}
              />
              <label htmlFor="news">
                <i class="bpost far fa-newspaper"> News</i>
              </label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Name"
              value={title}
              onChange={this.onInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="body">Body:</label>
            <textarea
              type="text"
              id="body"
              name="body"
              placeholder="Body"
              value={body}
              onChange={this.onInputChange}
            />
          </div>
          <div className="field">
            {entryType === "news" ? <BarLevel /> : null}
          </div>
          <div className="field">
            <label htmlFor="tags">Tags:</label>
            <input
              value={tag}
              onChange={this.onInputChange}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.onTagFormSubmit(e);
                }
              }}
              type="text"
              id="tag"
              name="tag"
              disabled={tagsError ? "disabled" : ""}
              placeholder={tagsError ? "Only 6 tags allowed" : "Insert a tag"}
            />
          </div>
          <div className="field">
            <input
              className=" ui orange button right floated"
              type="submit"
              value="Save"
            />
          </div>
        </form>
        <div className="ui relaxed horizontal list">
          {tags.map(tag => (
            <div className="item">
              <ul className="content ul">
                <li className="borderlist header">
                  {tag}{" "}
                  <span onClick={() => this.onDeleteTag(tag)} className="tags">
                    <i className="fas fa-times" />
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addNewEntry }
)(BlogCreator);
