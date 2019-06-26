import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 0,
    totalPage: 1
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.NAV_SEARCH_FOCUS:
            return state.set('focused', true);
        case constants.NAV_SEARCH_BLUR:
            return state.set('focused', false);
        case constants.CHANGE_SEARCH_INFO_LIST:
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            });
        case constants.SEARCH_INFO_MOUSE_ENTER:
            return state.set('mouseIn', true);
        case constants.SEARCH_INFO_MOUSE_LEAVE:
            return state.set('mouseIn', false);
        case constants.SEARCH_INFO_SWITCH_CLICK:
            return state.set('page', action.page);
        default:
            return state;
    }
}