import React, { Component } from "react";
import "../css/news.css";

class News extends Component {
  render() {
    const { title, body, tags, level } = this.props.news;
    return (
      <div className="blogSeparator">
        <div className="newsTitle">
          <h2 className="newsTitle2">{title}</h2>
          <h2 className="levelBarSpan">{`Hot ${level}/5`}</h2>
        </div>
        <div className="newsContent">
          <p>{body}</p>
          <ul className="ulStyle">
            {tags
              ? tags.map(tag => {
                  return <li className="tagStyle">{tag}</li>;
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default News;
