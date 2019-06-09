import { CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST } from './actionTypes';
import axios from 'axios';

/**
 * action 创建函数
 */
export const getChangeInputValueAction = inputValue => ({
    type: CHANG_INPUT_VALUE,
    inputValue
})

export const getAddTodoItemAction =  () => ({
    type: ADD_TODO_ITEM
})

export const getDeleteTodoItemAction = index => ({
    type: DELETE_TODO_ITEM,
    index
})

export const getInitListAction = list => ({
    type: INIT_LIST,
    list
})

//使用 redux-thunk 后， action 可以是函数
export const getInitList = () => {
    //返回函数 （虽然可以再简写 不用 return 用小括号
    //虽然没有 store ，但是这个函数会接收到 dispatch 方法
    return (dispatch) => {
        axios.get('/api/get/list').then((res) => {
            const action = getInitListAction(res.data);
            dispatch(action);
        });
    }
}