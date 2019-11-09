import React, { useState, useEffect, Fragment, createContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Counter from './Counter';

const CountContext = createContext();

function IndexPage() {
    // useEffect 称为 副作用。
    useEffect(() => {
        console.log('IndexPage useEffect 进入');
        // 回一个函数的形式进行解绑 componentWillUnmount
        // 但是点击计数器按钮，会发现 两个 console 也打印一遍   // 其实每次状态发生变化，useEffect都进行了解绑。    // 如何实现 componentWillUnmount 需要第二个参数，
        
        return () => {
            console.log('IndexPage 离开');
        }
    }, []);  // 当第二个参数传空数组[]时，就是当组件将被销毁时才进行解绑

    return <h2>yqbindex.com</h2>;
}

function ListPage() {
    useEffect(() => {
        console.log('ListPage useEffect 进入');
        return () => {
            console.log('ListPage 离开');
        }
    })
    return <h2>list page</h2>;
}



function Example() {
    const [ count, setCount ] = useState(0);
    // 等价于
    // let _useState = useState(0);
    // let count = _useState[0];
    // let setCount = _useState[1];

    // 那React是怎么保证这三个useState找到它自己对应的state呢？
    // 答案是：React是根据useState出现的顺序来确定的
    // React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。
    const [ age, setAge ] = useState(18);
    const [ sex, setSex ] = useState("男");

    // componentDidMount componentUpdate
    useEffect(() => {
        console.log(`useEffect => You clicked ${count} times`);

        return () => {
            console.log("====");
        }
    }, [count]);    // 它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。  

    return (
        <Fragment>
            <div>
                <p> You clicked { count } times </p>
                <button onClick={()=>{setCount(count + 1)}}>click me</button>
            </div>

            <div>
                <CountContext.Provider value={count}>
                    <Counter CountContext={CountContext} />
                </CountContext.Provider>
            </div>

            <div>
                <p>年龄: {age} 岁</p>
                <p>性别：{sex} </p>
            </div>

            <div>
                <Router>
                    <ul>
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/list/">列表</Link></li>
                    </ul>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/list/" component={ListPage} />
                </Router>
            </div>
        </Fragment>
    )
}

export default Example;