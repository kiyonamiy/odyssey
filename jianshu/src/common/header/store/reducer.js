import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focused: false
});

export default (state = defaultState, action) => {
    if(action.type === constants.NAV_SEARCH_FOCUS) {
        // immutable 对象的 set 方法，会结合之前的 immutable 对象的值和设置的值，返回一个全新的对象（依然为 immutable）
        return state.set('focused', true);
    }
    if(action.type === constants.NAV_SEARCH_BLUR) {
        return state.set('focused', false);
    }
    return state;
}