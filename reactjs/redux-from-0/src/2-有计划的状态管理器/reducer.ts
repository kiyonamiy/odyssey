import { State, Action } from "./type";
import * as constants from "./constants";

// 制定一个 state 修改计划，告诉 store，我的修改计划是什么。
export default function plan(state: State, action: Action): State {
  switch (action.type) {
    case constants.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case constants.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
