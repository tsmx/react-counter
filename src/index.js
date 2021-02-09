import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './Counter';

const App = () => {
    return (
        <div>
            <div>Hello, React world!</div>
            <Counter countFrom={0} countTo={123} durationMs={400}/>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);