import React, { Component } from 'react';
import TodoListUI from './TodoListUI';
import store from './store';
import { getGetInitListAction, getChangeInputValueAction, getAddTodoItemAction, getDeleteTodoItemAction } from './store/actionCreators';

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

    componentDidMount() {
        const action = getGetInitListAction();
        store.dispatch(action);     //（多了一个 action ）此时传入的是，getInitList 是要去获取数据的 action ，而不是 initList 去初始化列表的 action
        /**
         * 原始 ajax 请求
         */
        // axios.get('/api/get/list').then((res) => {
        //     const action = getInitListAction(res.data);
        //     store.dispatch(action);
        // })
        /**
         * redux thunk
         */
        // const action = getInitList();
        // // store 发现是函数，会将其执行
        // store.dispatch(action);
    }

    handleInputChange(e) {
        const action = getChangeInputValueAction(e.target.value);
        store.dispatch(action);
    }

    handleButtonClick() {
        if(this.state.inputValue === '') {
            return;
        }
        const action = getAddTodoItemAction();
        store.dispatch(action);
    }

    handleTodoItemClick(index) {
        const action = getDeleteTodoItemAction(index);
        store.dispatch(action);
    }
}

export default TodoList;