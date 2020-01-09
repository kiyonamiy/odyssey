import { State, Listener } from "./type";
import createStore from "./store";
import reducer from "./reducer";
import * as constants from "./constants";

let initialState: State = {
  count: 0
};

const store = createStore(reducer, initialState);

const listener: Listener = () => {
  console.log(store.getState());
};
store.subscribe(listener);

store.dispatch({
  type: constants.INCREMENT
});

store.dispatch({
  type: constants.DECREMENT
});

// 我想随便改 计划外的修改是无效的 default return state
// store.changeState({
//   count: "abcd"
// });

// plan 改成 reducer
// changeState 改成 dispatch
