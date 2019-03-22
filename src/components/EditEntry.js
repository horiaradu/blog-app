import React, { Component } from 'react';

class EditEntry extends Component {
  render() {
    return (
      <div>
        <h4>
          <i className="fas fa-edit" onClick={() => this.props.onEditClick()} />
        </h4>
      </div>
    );
  }
}
export default EditEntry;
