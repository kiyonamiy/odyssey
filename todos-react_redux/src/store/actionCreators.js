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