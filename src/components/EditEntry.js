import React, { Component } from 'react';

class EditEntry extends Component {
  render() {
    return (
      <div className="editButton">
        <i className="fas fa-edit" onClick={() => this.props.onEditClick()} />
      </div>
    );
  }
}
export default EditEntry;
