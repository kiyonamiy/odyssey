import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css';

class TodoListUI extends Component {
    render() {
        return (
            <div
                style={{ marginTop: 10, marginLeft: 10 }}
            >
                <div>
                    <Input
                        placeholder='todo'
                        style={{ width: 300 }}
                        value={this.props.inputValue}
                        onChange={this.props.handleInputChange}
                    />
                    <Button
                        style={{ marginLeft: 10 }}
                        type="primary"
                        onClick={this.props.handleButtonClick}    
                    >
                        提交
                    </Button>
                </div>
                <List
                    style={{ width: 300, marginTop: 10 }}
                    bordered
                    dataSource={this.props.list}
                    renderItem={(item, index) => <List.Item onClick={index => {this.props.handleTodoItemClick(index)}}>{item}</List.Item>}
                />
            </div>
        )
    }
}

export default TodoListUI;