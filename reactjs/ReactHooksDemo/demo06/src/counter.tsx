import React, { useContext } from 'react';
import { CountContext } from './App';

interface Props {
    helloStr: string;
}

export default function Counter({helloStr}: Props) {
    const count = useContext(CountContext);
    return (
        <h2>
            {helloStr} {count}
        </h2>
    )
}