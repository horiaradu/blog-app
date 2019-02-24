import React from "react";

class BarLevel extends React.Component {
  state = {
    level: 1,
    checked1: true,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false
  };
  onClick = e => {
    if (e.target.value === "level5" && !this.state.checked5.length) {
      this.setState({
        checked2: true,
        checked3: true,
        checked4: true,
        checked5: true,
        level: 5
      });
    } else if (e.target.value === "level4" && !this.state.checked4.length) {
      this.setState({
        checked2: true,
        checked3: true,
        checked4: true,
        level: 4
      });
    } else if (e.target.value === "level3" && !this.state.checked3.length) {
      this.setState({
        checked2: true,
        checked3: true,
        level: 3
      });
    } else if (e.target.value === "level2" && !this.state.checked2.length) {
      this.setState({
        checked2: true,
        level: 2
      });
    }
    if (e.target.value === "level4" && this.state.checked4) {
      this.setState({ checked5: false, level: 4 });
    } else if (e.target.value === "level3" && this.state.checked3) {
      this.setState({ checked5: false, checked4: false, level: 3 });
    } else if (e.target.value === "level2" && this.state.checked2) {
      this.setState({
        checked5: false,
        checked4: false,
        checked3: false,
        level: 2
      });
    } else if (e.target.value === "level1" && this.state.checked1) {
      this.setState({
        checked5: false,
        checked4: false,
        checked3: false,
        checked2: false,
        level: 1
      });
    }
  };
  onChange = () => {};
  render() {
    const { checked1, checked2, checked3, checked4, checked5 } = this.state;
    return (
      <div>
        <h3 className="ui centered grid" id="barLevelTitle">
          How Important Is This?<span>{`${this.state.level}/5`}</span>
        </h3>
        <div className="ui centered grid">
          <label className="labels" htmlFor="level1">
            {checked1 ? (
              <i className="fas fa-angle-double-up" />
            ) : (
              <i className="fas fa-angle-up" />
            )}
          </label>
          <input
            className="checkbox"
            id="level1"
            type="checkbox"
            name="vehicle"
            value="level1"
            checked={checked1}
            onClick={this.onClick}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level2">
            {checked2 ? (
              <i className="fas fa-angle-double-up" />
            ) : (
              <i className="fas fa-angle-up" />
            )}
          </label>
          <input
            className="checkbox"
            id="level2"
            type="checkbox"
            name="vehicle"
            value="level2"
            checked={checked2}
            onClick={this.onClick}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level3">
            {checked3 ? (
              <i className="fas fa-angle-double-up" />
            ) : (
              <i className="fas fa-angle-up" />
            )}
          </label>
          <input
            className="checkbox"
            id="level3"
            type="checkbox"
            name="vehicle"
            value="level3"
            checked={checked3}
            onClick={this.onClick}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level4">
            {checked4 ? (
              <i className="fas fa-angle-double-up" />
            ) : (
              <i className="fas fa-angle-up" />
            )}
          </label>
          <input
            className="checkbox"
            id="level4"
            type="checkbox"
            name="vehicle"
            value="level4"
            checked={checked4}
            onClick={this.onClick}
            onChange={this.onChange}
          />
          <label className="labels" htmlFor="level5">
            {checked5 ? (
              <i className="fas fa-angle-double-up" />
            ) : (
              <i className="fas fa-angle-up" />
            )}
          </label>
          <input
            className="checkbox"
            id="level5"
            type="checkbox"
            name="vehicle"
            value="level5"
            checked={checked5}
            onClick={this.onClick}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default BarLevel;
