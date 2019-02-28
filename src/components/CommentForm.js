import React, { Component } from 'react';
import { addNewComment } from '../actions/blogActions';
import { connect } from 'react-redux';

class AddCommentForm extends Component {
  state = {
    author: '',
    text: '',
    commentDate: new Date().toLocaleString()
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { author, text, commentDate } = this.state;

    const newComment = {
      author,
      text,
      commentDate
    };

    this.props.addNewComment(newComment);

    this.setState({ author: '', text: '' });
  };

  render() {
    const { author, text } = this.state;
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Author:</label>
          <input
            className="inputField"
            placeholder="Enter Name"
            type="text"
            name="author"
            value={author}
            onChange={this.onInputChange}
          />
          <label>Comment:</label>
          <textarea
            className="textareaField"
            placeholder="Type Something..."
            value={text}
            name="text"
            onChange={this.onInputChange}
          />
          <input type="submit" className="commentButton" value="Add Comment" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addNewComment }
)(AddCommentForm);
