import React, { Component } from 'react';
import TodoListUI from './TodoListUI';
import store from './store';
import { getChangeInputValueAction, getAddTodoItemAction, getDeleteTodoItemAction } from './store/actionCreators'


class TodoList extends Component {

    constructor(props) {
        super(props);
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleTodoItemClick = this.handleTodoItemClick.bind(this);

        this.state = store.getState();  //用 store 内的 默认 defaultState 初始化 组件内的 state

        store.subscribe(() => {this.setState(store.getState())});   //监听到 store 内部的 state 变化，会调用 传入的函数
    }

    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleInputChange={this.handleInputChange}
                handleButtonClick={this.handleButtonClick}
                handleTodoItemClick={this.handleTodoItemClick}
            />
        );
    }

    handleInputChange(e) {
        const action = getChangeInputValueAction(e.target.value);
        store.dispatch(action);
    }

    handleButtonClick() {
        const action = getAddTodoItemAction();
        store.dispatch(action);
    }

    handleTodoItemClick(index) {
        const action = getDeleteTodoItemAction(index);
        store.dispatch(action);
    }
}

export default TodoList;