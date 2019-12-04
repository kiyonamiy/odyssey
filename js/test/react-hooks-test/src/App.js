import React, { useState, useEffect } from 'react';

const add = (count, setCount) => {
  setCount(count + 1);
}

function App() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  useEffect(() => {
    switch(count) {
      case 0:
        for(let i = 0; i < 100; i ++) {
          add(count, setCount);
          console.log(count);
        }
      case 1:
          console.log(count);
          break;
    }
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => { add(count, setCount)}}>
        Click me
      </button>
    </div>
  );
}

export default App;
