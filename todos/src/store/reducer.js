import { CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';
const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    if(action.type === CHANG_INPUT_VALUE) {
        return Object.assign({}, state, {
            inputValue: action.inputValue
        });
    }
    if(action.type === ADD_TODO_ITEM) {
        return Object.assign({}, state, {
            inputValue: '',
            list: [...state.list, state.inputValue]
        });
    }
    if(action.type === DELETE_TODO_ITEM) {
        let copyList = [...state.list];
        copyList.splice(action.index, 1);
        
        return Object.assign({}, state, {
            list: copyList
        })
    }
    return state;
}