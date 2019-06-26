import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const getChangeSearchInfoListAction = data => ({
    type: constants.CHANGE_SEARCH_INFO_LIST,
    data: fromJS(data),                          //!!! 因为 state 中的 list 为 imutable ，所以使用 set 的时候，类型需要相同
    totalPage: Math.ceil(data.length / 10)
})

export const getNavSearchFocusAction = () => ({
    type: constants.NAV_SEARCH_FOCUS
})

export const getNavSearchBlurAction = () => ({
    type: constants.NAV_SEARCH_BLUR
})

export const getSearchInfoMouseEnterAction = () => ({
    type: constants.SEARCH_INFO_MOUSE_ENTER
})

export const getSearchInfoMouseLeaveAction = () => ({
    type: constants.SEARCH_INFO_MOUSE_LEAVE
})

export const getSearchInfoSwitchClickAction = (page) => ({
    type: constants.SEARCH_INFO_SWITCH_CLICK,
    page
})

//redux-thunk 返回函数，返回的函数调用时接受到 dispatch 。
export const getGetSearchInfoListAction = () => dispatch => {
    axios.get('/api/headerSearchInfo.json').then((res) => {
        dispatch(getChangeSearchInfoListAction(res.data.data));
    }).catch(() => {
        console.log("error");
    });
}
