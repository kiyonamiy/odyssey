import { Reducer, State, Listener, Store, Action } from "./type";

const createStore = function(plan: Reducer, initialState: State): Store {
  let state: State = initialState;
  let listenerList: Array<Listener> = [];

  function subscribe(listener: Listener) {
    listenerList.push(listener);
  }

  // 上一个版本直接传入 newState: any 随意修改！
  function dispatch(action: Action) {
    state = plan(state, action);
    for (let listener of listenerList) {
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
  };
};

export default createStore;
