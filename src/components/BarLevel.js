import React from "react";

class BarLevel extends React.Component {
  state = {
    level: 1,
    arr: [1, 0, 0, 0, 0]
  };

  onChange = e => {
    if (e.target.value === "level5") {
      this.setState({
        arr: [1, 1, 1, 1, 1],
        level: 5
      });
    } else if (e.target.value === "level4") {
      this.setState({
        arr: [1, 1, 1, 1, 0],
        level: 4
      });
    } else if (e.target.value === "level3") {
      this.setState({
        arr: [1, 1, 1, 0, 0],
        level: 3
      });
    } else if (e.target.value === "level2") {
      this.setState({
        arr: [1, 1, 0, 0, 0],
        level: 2
      });
    } else if (e.target.value === "level1") {
      this.setState({
        arr: [1, 0, 0, 0, 0],
        level: 1
      });
    }
  };
  render() {
    const { arr } = this.state;
    return (
      <div>
        <h3 className="ui centered grid" id="barLevelTitle">
          How Important Is This?<span>{`${this.state.level}/5`}</span>
        </h3>
        <div className="ui centered grid">
          <label className="labels" htmlFor="level1">
            {arr[0] === 1 ? (
              <i className="fas fa-circle" />
            ) : (
              <i className="far fa-circle" />
            )}
          </label>
          <input
            className="checkbox"
            id="level1"
            type="checkbox"
            name="barLevel"
            value="level1"
            checked={arr[0] === 1 ? "checked" : ""}
            onChange={this.onChange}
          />

          <label className="labels" htmlFor="level2">
            {arr[1] === 1 ? (
              <i className="fas fa-circle" />
            ) : (
              <i className="far fa-circle" />
            )}
          </label>
          <input
            className="checkbox"
            id="level2"
            type="checkbox"
            name="barLevel"
            value="level2"
            checked={arr[1] === 1 ? "checked" : ""}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level3">
            {arr[2] === 1 ? (
              <i className="fas fa-circle" />
            ) : (
              <i className="far fa-circle" />
            )}
          </label>
          <input
            className="checkbox"
            id="level3"
            type="checkbox"
            name="barLevel"
            value="level3"
            checked={arr[2] === 1 ? "checked" : ""}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level4">
            {arr[3] === 1 ? (
              <i className="fas fa-circle" />
            ) : (
              <i className="far fa-circle" />
            )}
          </label>
          <input
            className="checkbox"
            id="level4"
            type="checkbox"
            name="barLevel"
            value="level4"
            checked={arr[3] === 1 ? "checked" : ""}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level5">
            {arr[4] === 1 ? (
              <i className="fas fa-circle" />
            ) : (
              <i className="far fa-circle" />
            )}
          </label>
          <input
            className="checkbox"
            id="level5"
            type="checkbox"
            name="barLevel"
            value="level5"
            checked={arr[4] === 1 ? "checked" : ""}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default BarLevel;
