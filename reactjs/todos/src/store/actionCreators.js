import * as actionTypes from './actionTypes';
// import axios from 'axios';

/**
 * action 创建函数
 */
export const getChangeInputValueAction = inputValue => ({
    type: actionTypes.CHANG_INPUT_VALUE,
    inputValue
})

export const getAddTodoItemAction =  () => ({
    type: actionTypes.ADD_TODO_ITEM
})

export const getDeleteTodoItemAction = index => ({
    type: actionTypes.DELETE_TODO_ITEM,
    index
})

export const getInitListAction = list => ({
    type: actionTypes.INIT_LIST,
    list
})

export const getGetInitListAction = () => ({
    type: actionTypes.GET_INIT_LIST
})

/**
 * redux thunk
 */
// //使用 redux-thunk 后， action 可以是函数
// export const getInitList = () => {
//     //返回函数 （虽然可以再简写 不用 return 用小括号
//     //虽然没有 store ，但是这个函数会接收到 dispatch 方法
//     return (dispatch) => {
//         axios.get('/api/get/list').then((res) => {
//             const action = getInitListAction(res.data);
//             dispatch(action);
//         });
//     }
// }