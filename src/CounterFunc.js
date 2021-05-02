import React, { useState, useEffect, useRef } from 'react';

const CounterFunc = (props) => {

    const [counter, setCounter] = useState(props.countFrom);
    const propsRef = useRef(props);
    const minTimer = 50;

    useEffect(() => {
        const range = propsRef.current.countTo - propsRef.current.countFrom;
        // calc step time to show all intermediate values, never go below minTimer
        const stepTime = Math.max(Math.abs(Math.floor(propsRef.current.durationMs / range)), minTimer);
        // get current time and calculate desired end time
        const endTime = new Date().getTime() + propsRef.current.durationMs;
        var timer = setInterval(() => {
            let remaining = Math.max((endTime - new Date().getTime()) / propsRef.current.durationMs, 0);
            let value = Math.round(propsRef.current.countTo - (remaining * range));
            setCounter(value);
            if (value === propsRef.current.countTo) {
                clearInterval(timer);
                timer = null;
            }
        }, stepTime);
        // clean-up in case component unmounts before counting-up is done
        return () => {
            if (timer) {
                clearInterval(timer);
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