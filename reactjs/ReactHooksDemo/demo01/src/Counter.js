import React, { useContext } from 'react';
export default function Counter(CountContext) {
    const count = useContext(CountContext);
    return <h2>{count}</h2>
};