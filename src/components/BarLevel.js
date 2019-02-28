import React from 'react';

class BarLevel extends React.Component {
  state = {
    level: 1,
    arr: [1, 0, 0, 0, 0]
  };

  onChange = e => {
    const value = e.target.value;
    const index = parseInt(value[value.length - 1]);

    this.setState(
      {
        level: index,
        arr: new Array(index).fill(1).concat(new Array(5 - index).fill(0))
      },
      () => {
        this.props.updateLevel(this.state.level);
      }
    );
  };

  render() {
    const { arr } = this.state;
    return (
      <div className="">
        <div className="barLevelTitleWrap">
          <h4 className="barLevelTitle">How Important Is This?</h4>
        </div>
        <div className="labels">
          {arr.map((input, index) => {
            return (
              <React.Fragment>
                <label className="label" htmlFor={`level${index + 1}`}>
                  {' '}
                  <i className={`iconBarLevel ${input === 1 ? 'fas fa-circle' : 'far fa-circle iconBarLevel'}`} />
                </label>
                <input
                  className="checkbox hideBarLevelCheckBox"
                  id={`level${index + 1}`}
                  type="checkbox"
                  name="barLevel"
                  value={`level${index + 1}`}
                  checked={input === 1 ? 'checked' : ''}
                  onChange={this.onChange}
                />
              </React.Fragment>
            );
          })}
          <span className="barLevelSpan">{`${this.state.level}/5`}</span>
        </div>
      </div>
    );
  }
}

export default BarLevel;
