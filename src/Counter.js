import React from 'react';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.countTo = props.countTo;
        this.range = props.countTo - props.countFrom;
        this.duration = props.durationMs;
        this.state = { currentValue: props.countFrom };
    }

    componentDidMount() {
        // no timer shorter than 50ms (not really visible any way)
        let minTimer = 50;
        // calc step time to show all interediate values
        let stepTime = Math.abs(Math.floor(this.duration / this.range));
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);
        // get current time and calculate desired end time
        let startTime = new Date().getTime();
        this.endTime = startTime + this.duration;
        this.timer = setInterval(() => { this.run(); }, stepTime);
        this.run();
    }

    run() {
        let now = new Date().getTime();
        let remaining = Math.max((this.endTime - now) / this.duration, 0);
        let value = Math.round(this.countTo - (remaining * this.range));
        this.setState({ currentValue: value });
        if (value === this.countTo) {
            clearInterval(this.timer);
        }
    }


    render() {
        return <div>Counter: {this.state.currentValue}</div>;
    }

}

export default Counter;