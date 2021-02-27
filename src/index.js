import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './Counter';
import CounterFunc from './CounterFunc';

const App = () => {
    return (
        <div>
            <div>Hello, React world!</div>
            <div>Counter: <Counter countFrom={0} countTo={123} durationMs={400} /></div>
            <div>Counter: <CounterFunc countFrom={0} countTo={123} durationMs={400} /></div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);