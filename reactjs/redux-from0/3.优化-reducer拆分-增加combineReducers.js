// ------ combineReducers 实现 ------
// reducers { counter: counterReducer, info: InfoReducer }  // reducer 均为函数
function combineReducers(reducers) {
  // reducerKeys = ['counter', 'info']
  const reducerKeys = Object.keys(reducers);

  // 返回合并后的新的 reducer 函数（combination：所有 reducer 的结合体，一个大的 reducer，参数和结果与普通 reducer 一致
  // 这个大 reducer 更新是遍历所有的子 reducer
  return function combination(state = {}, action) {
      // 生成的新的 state
      const nextState = {};

      for(let i = 0; i < reducerKeys.length; i ++) {
          const key = reducerKeys[i];     // 'counter' or 'info'
          const reducer = reducers[key];  // 用键值取值而已 
          const previousStateForKey = state[key]; // 因为设置的键值和 state 的键值保持了一致

          const nextStateForKey = reducer(previousStateForKey, action);   // 执行子 reducer，获得新的 state

          nextState[key] = nextStateForKey;
      }

      return nextState;
  }
}

// ------ 测试 ------

let initState = {
  counter: {
    count: 0,
  },
  info: {
    name: 'kiyonami',
    description: '前端探索',
  }
}

/*counterReducer, 一个子reducer*/
/*注意：counterReducer 接收的 state 是 state.counter*/
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
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
  /*InfoReducer，一个子reducer*/
  /*注意：InfoReducer 接收的 state 是 state.info*/
function InfoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

// reducer: combination(state = {}, action)
const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer,
});

const store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state);
});

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'SET_NAME',
  name: 'yuqingbo',
});