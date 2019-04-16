import React, { Component } from 'react';
import '../css/news.css';
import DeleteEntry from './DeleteEntry';
import BlogForm from './BlogForm';
import EditEntry from './EditEntry';
class News extends Component {
  state = {
    isEditModeOn: false
  };

  changeState = () => {
    this.setState({ isEditModeOn: !this.state.isEditModeOn });
  };

  isAuthor = () => {
    return this.props.currentUser.userId === this.props.news.entry.userId;
  };

  render() {
    const { title, body, tags, level, userId } = this.props.news.entry;
    const entryUuid = this.props.news.entry.uuid;

    return (
      <div>
        {this.state.isEditModeOn ? (
          <BlogForm
            onUpdateClick={this.changeState}
            entry={this.props.news.entry}
            entryUuid={entryUuid}
            userId={userId}
          />
        ) : (
          <div className="blogSeparator">
            <div className="newsTitle">
              <span>
                <h2>{title}</h2>
              </span>
              <span>
                <div className="levelBarDiv">{`Hot ${level}/5`}</div>

                {this.isAuthor() && (
                  <span>
                    <EditEntry onEditClick={this.changeState} entryUuid={entryUuid} />
                    <DeleteEntry onEditClick={this.changeState} entryUuid={entryUuid} />
                  </span>
                )}
              </span>
            </div>
            <div className="newsContent">
              {this.props.users.map(user => {
                return (
                  user.userId === userId && <h4 key={entryUuid}>Created by - {`${user.firstName} ${user.lastName}`}</h4>
                );
              })}
              <p>{body}</p>
              <ul className="ulStyle">
                {tags &&
                  tags.map(tag => {
                    return (
                      <li key={tag} className="tagStyle">
                        {tag}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;
