import React, { useState, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';

const wsUri = "wss://echo.websocket.org/";

const add = (count, setCount) => {
  setCount(count + 1);
}

const pushMyArr = (num, myArr, setMyArr) => {
  setMyArr([...myArr, num]);
}

let outerCount = 0;

function App() {
  const [ count, setCount ] = useState(-1);
  const [ myArr, setMyArr ] = useState([]);

  console.log('first', myArr);
  
  // componentDidMount
  useEffect(() => {
    const client = new w3cwebsocket(wsUri);
    client.onopen = () => {
      console.log('client cnnect server successs!');
      function sendNumber() {
          if (client.readyState === client.OPEN) {
              client.send(outerCount ++);
              setTimeout(sendNumber, 1000);
          }
      }
      sendNumber();
    }
    client.onmessage = ({data}) => {
      switch(data) {
          default:
            setCount(data)
            break;
      }
    }
    
    console.log("DidMount")

    return () => {
      try {
        client.close();
      } catch (e) {

      }
    };
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log("Update")

    pushMyArr(count, myArr, setMyArr)

  }, [count]);

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
