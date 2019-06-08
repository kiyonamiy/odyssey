const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    if(action.type === 'change_input_value') {
        return Object.assign({}, state, {
            inputValue: action.inputValue
        });
    }
    if(action.type === 'add_todo_item') {
        return Object.assign({}, state, {
            inputValue: '',
            list: [...state.list, state.inputValue]
        });
    }
    if(action.type === 'delete_todo_item') {
        let copyList = [...state.list];
        copyList.splice(action.index, 1);
        
        return Object.assign({}, state, {
            list: copyList
        })
    }
    return state;
}