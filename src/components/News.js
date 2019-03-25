import React, { Component } from 'react';
import '../css/news.css';
import BlogForm from './BlogForm';
import DeleteEntry from './DeleteEntry';
import EditEntry from './EditEntry';

class News extends Component {
  state = {
    isEditModeOn: false
  };

  changeState = () => {
    this.setState({ isEditModeOn: !this.state.isEditModeOn });
  };

  render() {
    const { title, body, tags, level } = this.props.news.entry;
    const postUuid = this.props.news.entry.uuid;

    return (
      <div>
        {this.state.isEditModeOn ? (
          <BlogForm onUpdateClick={this.changeState} entry={this.props.news.entry} entryUuid={postUuid} />
        ) : (
          <div className="blogSeparator">
            <div className="newsTitle">
              <span>
                <h2>{title}</h2>
              </span>
              <span>
                <div className="levelBarDiv">{`Hot ${level}/5`}</div>
                <EditEntry onEditClick={this.changeState} postUuid={postUuid} />
                <DeleteEntry onEditClick={this.changeState} postUuid={postUuid} />
              </span>
            </div>
            <div className="newsContent">
              <p>{body}</p>
              <ul className="ulStyle">
                {tags
                  ? tags.map(tag => {
                      return (
                        <li key={tag} className="tagStyle">
                          {tag}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;
