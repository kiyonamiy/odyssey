import { CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';
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