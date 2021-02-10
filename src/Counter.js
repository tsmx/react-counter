import React from 'react';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.range = props.countTo - props.countFrom;
        this.state = { currentValue: props.countFrom };
    }

    componentDidMount() {
        // no timer shorter than 50ms (not really visible any way)
        let minTimer = 50;
        // calc step time to show all interediate values
        let stepTime = Math.abs(Math.floor(this.props.durationMs / this.range));
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);
        // get current time and calculate desired end time
        let startTime = new Date().getTime();
        this.endTime = startTime + this.props.durationMs;
        this.timer = setInterval(() => { this.countUp(); }, stepTime);
        this.countUp();
    }

    countUp() {
        let now = new Date().getTime();
        let remaining = Math.max((this.endTime - now) / this.props.durationMs, 0);
        let value = Math.round(this.props.countTo - (remaining * this.range));
        this.setState({ currentValue: value });
        if (value === this.props.countTo) {
            clearInterval(this.timer);
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