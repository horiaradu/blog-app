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
              <h2 className="newsTitle2">{title}</h2>
              <div>
                <EditEntry onEditClick={this.changeState} postUuid={postUuid} />
                <DeleteEntry onEditClick={this.changeState} postUuid={postUuid} />
              </div>
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
        )}
      </div>
    );
  }
}

export default News;
