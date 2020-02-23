//!!! 发布订阅者实践

export interface Store {
  subscribe: (listener: () => void) => void;
  changeState: (newState: any) => void;
  getState: () => any;
}

export default function createStore(initState: any): Store {
  let state = initState;
  const listenerList: Array<() => void> = [];

  function subscribe(listener: () => void) {
    listenerList.push(listener);
  }

  function changeState(newState: any) {
    state = newState;
    for (let listener of listenerList) {
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState
  };
}
