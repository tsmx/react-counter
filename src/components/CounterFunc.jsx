import React, { useState, useEffect, useRef } from 'react';

const CounterFunc = ({ countFrom, countTo, durationMs = 400 }) => {

  const [counter, setCounter] = useState(countFrom);
  const propsRef = useRef({ countFrom, countTo, durationMs });
  const minTimer = 50;

  useEffect(() => {
    const range = propsRef.current.countTo - propsRef.current.countFrom;
    // calc step time to show all intermediate values, never go below minTimer
    const stepTime = Math.max(Math.abs(Math.floor(propsRef.current.durationMs / range)), minTimer);
    // get current time and calculate desired end time
    const startTime = new Date().getTime();
    const endTime = startTime + propsRef.current.durationMs;
    let timer = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / propsRef.current.durationMs, 0);
      const value = Math.round(propsRef.current.countTo - (remaining * range));
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

export default CounterFunc;
