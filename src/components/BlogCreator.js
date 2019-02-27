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
    level: 1,
    tagsError: false,
    entryTypeError: false,
    emptyTitleError: false,
    emptyBodyError: false
  };

  changeErrorState = () => {
    const { title, body } = this.state;
    if (title !== "") {
      this.setState({ emptyTitleError: false });
    }
    if (body !== "") {
      this.setState({ emptyBodyError: false });
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.changeErrorState();
    });
  };

  onRadioChange = e => {
    this.setState({
      entryType: e.target.value,
      entryTypeError: false
    });
  };

  onFormSubmit = e => {
    const { title, body, entryType, tags, level } = this.state;
    e.preventDefault();

    if (entryType === "") {
      this.setState({
        entryTypeError: true
      });
    }
    if (title === "") {
      this.setState({ emptyTitleError: true });
    }
    if (body === "") {
      this.setState({ emptyBodyError: true });
    }

    if (body !== "" && title !== "" && entryType !== "") {
      const newEntry = {
        title,
        body,
        entryType,
        tags,
        level
      };

      this.props.addNewEntry(newEntry);

      this.setState({
        title: "",
        body: "",
        entryType: "",
        tag: "",
        tags: [],
        level: 1,
        tagsError: false
      });
    }
  };

  updateLevel = level => {
    this.setState({ level: level });
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
        <div className="panelTitle">
          <h1>Create Entry</h1>
          <br />
        </div>
        <div className="panelContent">
          <form onSubmit={this.onFormSubmit}>
            <div>
              <div className="radioInLine">
                <input
                  type="radio"
                  id="post"
                  name={this.state.entryType}
                  value="post"
                  checked={this.state.entryType === "post"}
                  onChange={this.onRadioChange}
                  className="hide"
                />
                <label className="radioIcon" htmlFor="post">
                  {this.state.entryType === "post" ? (
                    <i className="radioIcon fas fa-check-circle" />
                  ) : (
                    <i className="radioIcon far fa-circle" />
                  )}
                </label>{" "}
                <i className="bpost fas fa-blog">Blog</i>
              </div>

              <div className="radioInLine">
                <input
                  type="radio"
                  id="news"
                  name={this.state.entryType}
                  value="news"
                  checked={this.state.entryType === "news"}
                  onChange={this.onRadioChange}
                  className="hide"
                />
                <label htmlFor="news">
                  {this.state.entryType === "news" ? (
                    <i className="radioIcon fas fa-check-circle" />
                  ) : (
                    <i className="radioIcon far fa-circle" />
                  )}
                </label>{" "}
                <i className="bpost far fa-newspaper"> News</i>
              </div>
            </div>
            <div>
              {this.state.entryTypeError ? (
                <input
                  className="displayError"
                  type="text"
                  placeholder="Please select a post type"
                  disabled
                />
              ) : null}
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Name"
                value={title}
                onChange={this.onInputChange}
                className="inputField"
              />
            </div>
            <div>
              {this.state.emptyTitleError ? (
                <input
                  className="displayError"
                  type="text"
                  placeholder="Please enter a title"
                  disabled
                />
              ) : null}
            </div>
            <div>
              <label htmlFor="body">Body:</label>
              <textarea
                type="text"
                id="body"
                name="body"
                placeholder="Body"
                value={body}
                onChange={this.onInputChange}
                className="textareaField"
              />
            </div>
            <div>
              {this.state.emptyBodyError ? (
                <input
                  className="displayError"
                  type="text"
                  placeholder="Please enter some text"
                  disabled
                />
              ) : null}
            </div>
            <div>
              {entryType === "news" ? (
                <BarLevel updLevel={this.updateLevel} />
              ) : null}
            </div>
            <div>
              <label htmlFor="tags">Tags:</label>
              <input
                className="inputField"
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
            <div className="buttonWrap">
              <input className="button" type="submit" value="Save" />
              <ul className="ulStyle">
                {tags.map(tag => (
                  <li key={tag} className="tagStyle">
                    {tag}{" "}
                    <span onClick={() => this.onDeleteTag(tag)}>
                      <i className="tags fas fa-times" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addNewEntry }
)(BlogCreator);
