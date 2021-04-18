import React, { useState, useEffect, useRef } from 'react';

const CounterFunc = (props) => {

    const [counter, setCounter] = useState(props.countFrom);
    const timer = useRef(null);
    const effectProps = useRef(props);
    const minTimer = 50;

    useEffect(() => {
        var range = effectProps.current.countTo - effectProps.current.countFrom;
        // calc step time to show all intermediate values, never go below minTimer
        let stepTime = Math.max(Math.abs(Math.floor(effectProps.current.durationMs / range)), minTimer);
        // get current time and calculate desired end time
        let startTime = new Date().getTime();
        var endTime = startTime + effectProps.current.durationMs;
        timer.current = setInterval(() => {
            let now = new Date().getTime();
            let remaining = Math.max((endTime - now) / effectProps.current.durationMs, 0);
            let value = Math.round(effectProps.current.countTo - (remaining * range));
            setCounter(value);
            if (value === effectProps.current.countTo) {
                clearInterval(timer.current);
                timer.current = null;
            }
        }, stepTime);
        // clean-up in case component unmounts before counting-up is done
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        };
    }, []);

    return (
        <span>{counter}</span>
    );
}

CounterFunc.defaultProps = {
    durationMs: 400
}

export default CounterFunc;