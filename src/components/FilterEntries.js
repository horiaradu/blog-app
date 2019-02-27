import React, { Component } from "react";

class FilterEntries extends Component {
  renderBasedOnCheckType = e => {
    if (e.target.value === "post") {
      this.props.changePostCheck();
    }
    if (e.target.value === "news") {
      this.props.changeNewsCheck();
    }
  };

  render() {
    const { postCheck, newsCheck } = this.props.filter;
    return (
      <div>
        <div className="checkBoxWrap ">
          <div>
            <h2>All:</h2>
          </div>
          <div className="checkboxInput">
            <input
              className="checkbox"
              id="postsCheckBox"
              name="post"
              type="checkbox"
              value="post"
              checked={postCheck}
              onChange={this.renderBasedOnCheckType}
            />
            <label htmlFor="postsCheckBox">
              {postCheck ? (
                <div className="checkboxText">
                  <i className="checkSqIcon fas fa-square" />
                  Posts
                </div>
              ) : (
                <div className="checkboxText">
                  <i className="checkSqIcon far fa-square" />
                  Posts
                </div>
              )}
            </label>
          </div>
          <div className="checkboxInput">
            <input
              className="checkbox"
              id="newsCheckBox"
              name="news"
              type="checkbox"
              value="news"
              checked={newsCheck}
              onChange={this.renderBasedOnCheckType}
            />
            <label htmlFor="newsCheckBox">
              {newsCheck ? (
                <div className="checkboxText">
                  <i className="checkSqIcon fas fa-square" />
                  News
                </div>
              ) : (
                <div className="checkboxText">
                  <i className="checkSqIcon far fa-square" />
                  News
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterEntries;
