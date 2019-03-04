import React, { Component } from 'react';
import { addNewComment, addCommentsToLocalStorage } from '../actions/blogActions';
import { connect } from 'react-redux';
import classNames from 'classnames';

class AddCommentForm extends Component {
  state = {
    author: '',
    text: '',
    commentDate: new Date().toLocaleString(),
    emptyAuthorError: false,
    emptyTextError: false
  };

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
      commentDate
    };
    if (author === '') {
      this.setState({ emptyAuthorError: true });
    }
    if (text === '') {
      this.setState({ emptyTextError: true });
    }
    if (author !== '' && text !== '') {
      this.props.addNewComment(newComment, this.props.postUuid);
      this.props.addCommentsToLocalStorage();
      this.setState({ author: '', text: '' });
    }
  };

  render() {
    const { author, text, emptyAuthorError, emptyTextError } = this.state;
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
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
          <input type="submit" className="commentButton" value="Add Comment" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addNewComment, addCommentsToLocalStorage }
)(AddCommentForm);
