/**
 * 把异步的逻辑 放在单独的文件里管理
 */

import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { getInitListAction } from './actionCreators';
import axios from 'axios';

function* getInitList() {
    try {
        const res = yield axios.get('/api/get/list');
        const action = getInitListAction(res.data); //此时又使用 初始化list的action
        yield put(action);
    } catch(e) {
        console.log('/api/get/list 网络请求失败');
    }

}

// 必须是 generator 函数
// 不仅可以在 reducer 接收到 action ，saga 也可以
function* saga() {
    yield takeEvery(GET_INIT_LIST, getInitList);
}

export default saga;