import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';

class Comments extends Component {
  state = {
    showComments: false
  };
  onShowClick = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    const { showComments } = this.state;
    const comments = this.props.comments;
    return (
      <div>
        <br />
        <div>
          <h3>
            Comments <i style={{ cursor: 'pointer' }} className="fas fa-sort-down" onClick={this.onShowClick} />
          </h3>
        </div>
        {showComments
          ? comments.map(comment => {
              return (
                <div>
                  <h5>Author: {comment.author}</h5>
                  <p>
                    Text: {comment.text} <span>Date:{comment.commentDate}</span>
                  </p>
                </div>
              );
            })
          : null}
        {showComments ? <CommentForm /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.blog.comments
  };
};

export default connect(mapStateToProps)(Comments);
