import React, { Component } from 'react';
import { addNewEntry, updateEntry } from '../redux/actions/blogActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BarLevel from './BarLevel';
import '../css/blogCreator.css';
import '../css/mainPage.css';
import classNames from 'classnames';

class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.entry ? props.entry.title : '',
      body: props.entry ? props.entry.body : '',
      tag: props.entry ? props.entry.tag : '',
      entryType: props.entry ? props.entry.entryType : '',
      tags: props.entry ? props.entry.tags : [],
      level: props.entry ? props.entry.level : 1,
      tagsError: false,
      entryTypeError: false,
      emptyTitleError: false,
      emptyBodyError: false,
      tagReused: false
    };
  }
  onChangeStateClick = () => {
    this.props.onUpdateClick();
  };
  onButtonUpdateEntry = () => {
    const { title, body, entryType, tags, level } = this.state;
    const userId = this.props.userId;
    const entryUuid = this.props.entryUuid;
    if (entryType === '') {
      this.setState({
        entryTypeError: true
      });
    }
    if (title === '') {
      this.setState({ emptyTitleError: true });
    }
    if (body === '') {
      this.setState({ emptyBodyError: true });
    }

    if (body !== '' && title !== '' && entryType !== '') {
      const updatedPost = {
        title: title
          .slice(0, 1)
          .toUpperCase()
          .concat(title.slice(1)),
        body: body
          .slice(0, 1)
          .toUpperCase()
          .concat(body.slice(1)),
        entryType,
        tags,
        level,
        uuid: entryUuid,
        userId
      };
      this.props.updateEntry(entryUuid, updatedPost, userId);
      this.props.onUpdateClick();
    }
  };
  changeErrorState = () => {
    const { title, body } = this.state;
    if (title !== '') {
      this.setState({ emptyTitleError: false });
    }
    if (body !== '') {
      this.setState({ emptyBodyError: false });
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.changeErrorState();
    });
    if (this.state.tagReused) {
      this.setState({ tagReused: false });
    }
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

    if (entryType === '') {
      this.setState({
        entryTypeError: true
      });
    }
    if (title === '') {
      this.setState({ emptyTitleError: true });
    }
    if (body === '') {
      this.setState({ emptyBodyError: true });
    }

    if (body !== '' && title !== '' && entryType !== '') {
      const newEntry = {
        title: title
          .slice(0, 1)
          .toUpperCase()
          .concat(title.slice(1)),
        body: body
          .slice(0, 1)
          .toUpperCase()
          .concat(body.slice(1)),
        entryType,
        tags,
        level,
        userId: this.props.auth.uid
      };

      this.props.addNewEntry(newEntry);
      this.props.history.push('/');

      this.setState({
        title: '',
        body: '',
        entryType: '',
        tag: '',
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

    if (this.state.tags.length < 5 && !this.state.tags.includes(this.state.tag)) {
      this.setState({
        tags: this.state.tags.concat(this.state.tag),
        tag: ''
      });
    } else if (!this.state.tags.includes(this.state.tag)) {
      this.setState({ tag: '', tagsError: true });
      this.setState({ tags: this.state.tags.concat(this.state.tag), tag: '' });
    } else
      this.setState({
        tagReused: true
      });
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
    const {
      title,
      body,
      tag,
      tags,
      entryType,
      tagsError,
      emptyBodyError,
      emptyTitleError,
      entryTypeError,
      tagReused
    } = this.state;
    if (!this.props.auth.uid) return <Redirect to="/login" />;

    return (
      <div className="wrapper">
        <div className="panelTitle">
          <h1>{this.props.entry ? 'Edit Entry' : 'Create Entry'}</h1>
          <br />
        </div>
        <div className="panelContent">
          <form onSubmit={this.onFormSubmit}>
            <div className="radioButtonsWrapper">
              <div className="radioInLine">
                <input
                  type="radio"
                  id="post"
                  name={this.state.entryType}
                  value="post"
                  checked={this.state.entryType === 'post'}
                  onChange={this.onRadioChange}
                />{' '}
                <label className="radioIcon" htmlFor="post" />
                <i className="bpost fas fa-blog">Blog</i>
              </div>

              <div className="radioInLine">
                <input
                  type="radio"
                  id="news"
                  name={this.state.entryType}
                  value="news"
                  checked={this.state.entryType === 'news'}
                  onChange={this.onRadioChange}
                />{' '}
                <label htmlFor="news" />
                <i className="bpost far fa-newspaper"> News</i>
              </div>
            </div>
            <div>
              {entryTypeError && (
                <p
                  className={classNames({
                    radioError: entryTypeError
                  })}
                >
                  Please choose a post type
                </p>
              )}
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
                className={classNames('inputField', {
                  inputError: emptyTitleError
                })}
              />
              {emptyTitleError && (
                <p
                  className={classNames({
                    labelError: emptyTitleError
                  })}
                >
                  Please enter a title
                </p>
              )}
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
                className={classNames('textareaField', { inputError: emptyBodyError })}
              />
              {emptyBodyError && (
                <p
                  className={classNames({
                    labelError: emptyBodyError
                  })}
                >
                  Please enter some text
                </p>
              )}
            </div>

            <div>{entryType === 'news' ? <BarLevel updateLevel={this.updateLevel} /> : null}</div>

            <div>
              <label htmlFor="tags">Tags:</label>
              <input
                className={classNames('inputField', { inputErrorTag: tagReused })}
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
                disabled={tagsError ? 'disabled' : ''}
                placeholder={tagsError ? 'Only 6 tags allowed' : 'Insert a tag'}
              />
              {this.state.tagReused && (
                <p
                  className={classNames({
                    tagReusedError: tagReused
                  })}
                >
                  Tag already used
                </p>
              )}
            </div>
            <div>
              <ul className="ulStyle">
                {tags.map(tag => (
                  <li key={tag} className="tagStyle">
                    {tag}
                    <i
                      onClick={() => this.onDeleteTag(tag)}
                      style={{ cursor: 'pointer' }}
                      className="tagsDeleteIcon fas fa-times"
                    />
                  </li>
                ))}
              </ul>
            </div>
            {this.props.entry ? null : (
              <div className="buttonWrap">
                <input className="button" type="submit" value="Save" />
              </div>
            )}
          </form>
          {this.props.entry && (
            <div className="edit-delete_wrapper">
              <span>
                <button className="cancelButton" onClick={this.onChangeStateClick}>
                  Cancel
                </button>
                <button className="updateButton" onClick={this.onButtonUpdateEntry}>
                  Update
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { addNewEntry, updateEntry }
)(BlogForm);
