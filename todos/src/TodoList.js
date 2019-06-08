import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import store from './store';
import 'antd/dist/antd.css';

class TodoList extends Component {

    constructor(props) {
        super(props);
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.state = store.getState();  //用 store 内的 默认 defaultState 初始化 组件内的 state

        store.subscribe(() => {this.setState(store.getState())});   //监听到 store 内部的 state 变化，会调用 传入的函数
    }

    render() {
        return (
            <div
                style={{ marginTop: 10, marginLeft: 10 }}
            >
                <div>
                    <Input
                        placeholder='todo'
                        style={{ width: 300 }}
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <Button
                        style={{ marginLeft: 10 }}
                        type="primary"
                        onClick={this.handleButtonClick}    
                    >
                        提交
                    </Button>
                </div>
                <List
                    style={{ width: 300, marginTop: 10 }}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => <List.Item onClick={this.handleTodoItemClick.bind(this, index)}>{item}</List.Item>}
                />
            </div>
        )
    }

    handleInputChange(e) {
        const action = {
            type: 'change_input_value',
            inputValue: e.target.value
        }
        store.dispatch(action);
    }

    handleButtonClick() {
        const action = {
            type: 'add_todo_item'
        }
        store.dispatch(action);
    }

    handleTodoItemClick(index) {
        const action = {
            type: 'delete_todo_item',
            index
        }
        store.dispatch(action);
    }
}

export default TodoList;