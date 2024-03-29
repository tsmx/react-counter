import React from 'react';

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.range = props.countTo - props.countFrom;
    this.state = { currentValue: props.countFrom };
  }

  componentDidMount() {
    // no timer shorter than 50ms (not really visible any way)
    const minTimer = 50;
    // calc step time to show all interediate values
    let stepTime = Math.abs(Math.floor(this.props.durationMs / this.range));
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    // get current time and calculate desired end time
    const startTime = new Date().getTime();
    this.endTime = startTime + this.props.durationMs;
    this.timer = setInterval(() => { this.countUp(); }, stepTime);
    this.countUp();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  countUp() {
    const now = new Date().getTime();
    const remaining = Math.max((this.endTime - now) / this.props.durationMs, 0);
    const value = Math.round(this.props.countTo - (remaining * this.range));
    this.setState({ currentValue: value });
    if (value === this.props.countTo) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }


  render() {
    return <span>{this.state.currentValue}</span>;
  }

}

Counter.defaultProps = {
  durationMs: 400
}

export default Counter;