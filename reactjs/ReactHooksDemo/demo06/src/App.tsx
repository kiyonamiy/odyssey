import React, { Fragment, useState, useEffect, createContext } from 'react';
import Counter from './counter';

export const CountContext = createContext<number>(10);

function Example() {
    const [ count, setCount ] = useState<number>(0);

    // componentDidMount componentUpdate
    useEffect(() => {
        console.log(`副作用 useEffect ${count}`);
        return () => {
            console.log(`解除副作用 useEffect ${count}`);
        }
    }, [count]);    // 当这个变量发生改变，就会调用解除副作用 // componentWillUnmount

    return (
        <Fragment>
            <p>You clicked {count} times </p>
            <button onClick={()=>{setCount(count + 1)}}> click me</button>
            
            <CountContext.Provider value={count}>
                <Counter helloStr={'hello world'} />
            </CountContext.Provider>
        </Fragment>
    )
}

export default Example;