import { CHANG_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';

const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case CHANG_INPUT_VALUE:
        {
            const newState = JSON.parse(JSON.stringify(state));
            newState.inputValue = action.inputValue;
            return newState;
        }
        case ADD_TODO_ITEM:
        {
            if(state.inputValue === '') {
                return state;
            }
            const newState = JSON.parse(JSON.stringify(state));
            newState.list = [...state.list, state.inputValue];
            newState.inputValue = '';
            return newState;
        }
        case DELETE_TODO_ITEM:
        {
            const newState = JSON.parse(JSON.stringify(state));
            newState.list.splice(action.index, 1);
            return newState;
        }
            //会报错，可能是因为 Object.assign 是浅拷贝
            // const newState = Object.assign({}, state);
            // newState.list.splice(action.index, 1);
            // console.log(newState);
            // return newState;
        default:
            return state;
    }
}