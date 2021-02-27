import React, { useState, useEffect, useRef } from "react";

const CounterFunc = (props) => {

    const [counter, setCounter] = useState(props.countFrom);
    const timer = useRef(null);
    const effectProps = useRef(props);


    useEffect(() => {
        console.log("setup");
        var range = effectProps.current.countTo - effectProps.current.countFrom;
        // no timer shorter than 50ms (not really visible any way)
        let minTimer = 50;
        // calc step time to show all interediate values
        let stepTime = Math.abs(Math.floor(effectProps.current.durationMs / range));
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);
        // get current time and calculate desired end time
        let startTime = new Date().getTime();
        var endTime = startTime + effectProps.current.durationMs;
        timer.current = setInterval(() => {
            console.log("step");
            let now = new Date().getTime();
            let remaining = Math.max((endTime - now) / effectProps.current.durationMs, 0);
            let value = Math.round(effectProps.current.countTo - (remaining * range));
            setCounter(value);
            if (value=== effectProps.current.countTo) {
                clearInterval(timer.current);
            }
        }, stepTime);
    }, []);

    return (
        <span>{counter}</span>
    );
}

CounterFunc.defaultProps = {
    durationMs: 400
}

export default CounterFunc;