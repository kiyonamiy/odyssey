import { INCREMENT, DECREMENT } from "./constants";

export type INCREMENT = typeof INCREMENT;
export type DECREMENT = typeof DECREMENT;

export interface Action {
  type: INCREMENT | DECREMENT;
}

export interface State {
  count: number;
}

export type Reducer = (state: State, action: Action) => State;

export type Listener = () => void;

// 是一个闭包，内部存储着 state
export interface Store {
  subscribe: (listener: Listener) => void;
  dispatch: (action: Action) => void;
  getState: () => State;
}
