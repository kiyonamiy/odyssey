// 随意修改版
// let initState = {
//     count: 0
//   }
//   let store = createStore(initState);
  
//   store.subscribe(() => {
//     let state = store.getState();
//     console.log(state.count);
//   });
//   /*自增*/
//   store.changeState({
//     count: store.getState().count + 1
//   });
//   /*自减*/
//   store.changeState({
//     count: store.getState().count - 1
//   });
//   /*我想随便改*/
//   store.changeState({
//     count: 'abc'
//   });

// ---- 有计划的状态管理器 ----

// plan 即 reducer，防止随意修改，只允许有计划地修改    // 制定 state 的修改计划，防止乱修改（比如把 count 变为 string 类型
function reducer(state, action) {
// function plan(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}

const createStore = function(reducer, initState) {
    let state = initState;
    let listeners = [];

    function subscribe(listener) {
        listeners.push(listener);
    }
    // changeState 即 dispatch
    function dispatch(action) {
    // function changeState(action) {
        state = reducer(state, action);

        for(let listener of listeners) {
            listener();
        }
    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}


// ---- 测试 ----
let initState = {
    count: 0,
}

let store = createStore(plan, initState);

store.subscribe(()=> {
    let state = store.getState();
    console.log(state.count);
});

/*自增*/
store.dispatch({
    type: 'INCREMENET',
});

/*自减*/
store.dispatch({
    type: 'DECREMENT',
});

/* 我想随便改 计划外的修改是无效的！*/
store.dispatch({
    count: 'abc'
})