import React, { Component } from "react";

class News extends Component {
  render() {
    const { title, body, tags, level } = this.props.news;
    return (
      <div>
        <div>
          <h1>
            {title} <span>{`Importance ${level}/5`}</span>
          </h1>
        </div>
        <p>{body}</p>
        <ul>
          {tags
            ? tags.map(tag => {
                return <li>{tag}</li>;
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default News;
