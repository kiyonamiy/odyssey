import { CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST } from './actionTypes';
const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    // console.log(state);
    switch(action.type) {
        case CHANG_INPUT_VALUE:
            return Object.assign({}, state, {
                inputValue: action.inputValue
            });
        case ADD_TODO_ITEM:
            return Object.assign({}, state, {
                inputValue: '',
                list: [...state.list, state.inputValue]
            });
        case DELETE_TODO_ITEM:
            let copyList = [...state.list];
            copyList.splice(action.index, 1);
            
            return Object.assign({}, state, {
                list: copyList
            });
        case INIT_LIST:
            return Object.assign({}, state, {
                list: action.list
            })
        default:
            return state;
    }
}