// state 我们还是写在一起的，这样会造成 state 树很庞大，不直观，很难维护。

/* counter 自己的 state 和 reducer 写在一起*/
let initSate = {
    count: 0,
}

function counterReducer(state, action) {
    // 多了这一条件
    /*注意：如果 state 没有初始值，那就给他初始值！！*/  
    if (!state) {
        state = initState;
    }

    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1
        }
      default:    
        return state;
    }
}

const createStore = function (reducer, initState) {
    let state = initState;
    let listeners = [];
  
    function subscribe(listener) {
      listeners.push(listener);
    }
  
    function dispatch(action) {
      state = reducer(state, action);
      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        listener();
      }
    }
  
    function getState() {
      return state;
    }
    /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
    // createStore 的时候，用一个不匹配任何 type 的 action，来触发 state = reducer(state, action)
    // 因为 action.type 不匹配，每个子 reducer 都会进到 default 项，返回自己初始化的 state，这样就获得了初始化的 state 树了。
    dispatch({ type: Symbol() })
  
    return {
      subscribe,
      dispatch,
      getState
    }
  }

// ---- 测试 ----
/*这里没有传 initState 哦 */
const store = createStore(reducer);
/*这里看看初始化的 state 是什么*/
console.dir(store.getState());