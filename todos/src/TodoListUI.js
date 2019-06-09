import React from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css';

export default props => (
    <div
        style={{ marginTop: 10, marginLeft: 10 }}
    >
        <div>
            <Input
                placeholder='todo'
                style={{ width: 300 }}
                value={props.inputValue}
                onChange={props.handleInputChange}
            />
            <Button
                style={{ marginLeft: 10 }}
                type="primary"
                onClick={props.handleButtonClick}    
            >
                提交
            </Button>
        </div>
        <List
            style={{ width: 300, marginTop: 10 }}
            bordered
            dataSource={props.list}
            renderItem={(item, index) => <List.Item onClick={() => {props.handleTodoItemClick(index)}}>{item}</List.Item>}
        />
    </div>
)