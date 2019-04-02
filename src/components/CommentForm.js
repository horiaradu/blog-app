import React, { Component } from 'react';
import { addNewComment } from '../redux/actions/blogActions';
import { connect } from 'react-redux';
import classNames from 'classnames';

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.currentUser.firstName ? `${props.currentUser.firstName} ${props.currentUser.lastName}` : '',
      text: props.currentComment ? props.currentComment.text : '',
      commentDate: new Date().toLocaleString(),
      emptyAuthorError: false,
      emptyTextError: false
    };
  }

  changeErrorState = () => {
    const { author, text } = this.state;
    if (author !== '') {
      this.setState({ emptyAuthorError: false });
    }
    if (text !== '') {
      this.setState({ emptyTextError: false });
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.changeErrorState();
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { author, text, commentDate } = this.state;

    const newComment = {
      author: author
        .slice(0, 1)
        .toUpperCase()
        .concat(author.slice(1)),
      text: text
        .slice(0, 1)
        .toUpperCase()
        .concat(text.slice(1)),
      commentDate,
      userId: this.props.currentUser.userId ? this.props.currentUser.userId : ''
    };

    if (author === '') {
      this.setState({ emptyAuthorError: true });
    }
    if (text === '') {
      this.setState({ emptyTextError: true });
    }
    if (author !== '' && text !== '') {
      this.props.addNewComment(newComment, this.props.entryUuid);
      this.setState({
        author: this.props.currentUser.firstName
          ? `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`
          : '',
        text: ''
      });
    }
  };

  onUpdateCommentClick = () => {
    const { author, text, commentDate } = this.state;

    const updatedComment = {
      author: author
        .slice(0, 1)
        .toUpperCase()
        .concat(author.slice(1)),
      text: text
        .slice(0, 1)
        .toUpperCase()
        .concat(text.slice(1)),
      commentDate,
      userId: this.props.currentUser.userId ? this.props.currentUser.userId : ''
    };
    this.props.onUpdateClick(this.props.currentComment.uuid, updatedComment, this.props.entryUuid);
    if (author === '') {
      this.setState({ emptyAuthorError: true });
    }
    if (text === '') {
      this.setState({ emptyTextError: true });
    }
  };

  isEditModeOn = () => {
    return this.props.currentComment;
  };

  render() {
    const { author, text, emptyAuthorError, emptyTextError } = this.state;
    return (
      <div>
        <form id="addNewCommentForm" onSubmit={this.onFormSubmit}>
          {this.props.currentUser.firstName ? null : (
            <div>
              <label>Author:</label>
              <input
                className={classNames('inputField', { inputError: emptyAuthorError })}
                placeholder="Enter Name"
                type="text"
                name="author"
                value={author}
                onChange={this.onInputChange}
              />
              {emptyAuthorError && (
                <p
                  className={classNames({
                    labelError: emptyAuthorError
                  })}
                >
                  Please enter name
                </p>
              )}
            </div>
          )}

          <label>Comment:</label>
          <textarea
            className={classNames('textareaField', { inputError: emptyTextError })}
            placeholder="Type Something..."
            value={text}
            name="text"
            onChange={this.onInputChange}
          />
          {emptyTextError && (
            <p
              className={classNames({
                labelError: emptyAuthorError
              })}
            >
              Enter text
            </p>
          )}

          {!this.props.currentComment && <input type="submit" className="commentButton" value="Add Comment" />}
        </form>
        {this.isEditModeOn() && (
          <div>
            <button onClick={this.props.onCancelClick}>Cancel</button>
            <button onClick={this.onUpdateCommentClick}>Update</button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { addNewComment }
)(CommentForm);
