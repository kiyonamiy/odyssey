import React from 'react';
import { connect } from 'react-redux';
import { getChangeInputValueAction, getAddTodoItemAction, getDeleteTodoItemAction } from './store/actionCreators';


//其实这里 TodoList 是一个 UI 组件，只有 render() 方法，可以将其改为 无状态组件
const TodoList = (props) => {

    const { inputValue, list, handleInputChange, handleButtonClick, handleItemClick } = props;

    return(
        <div>
            <div>
                <input 
                    placeholder="todo"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button
                    onClick={handleButtonClick}
                >
                    commit
                </button>
            </div>
            <ul>
                {
                    list.map((item, index) => (
                        <li 
                            onClick={() => {handleItemClick(index)}}
                            key={index}
                        >
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

//规则一：将 store 里的 state 映射至 TodoList 中的 props（定义属性
const mapStateToProps = state => ({
    inputValue: state.inputValue,    //props 中的 inputValue 等于 store 中的 inputValue
    list: state.list
})

//规则二：可以使用 store 的 dispatch 方法。（定义方法
const mapDispatchToProps = dispatch => ({
    handleInputChange(e) {
        const action = getChangeInputValueAction(e.target.value);
        dispatch(action);
    },
    handleButtonClick() {
        const action = getAddTodoItemAction();
        dispatch(action);
    },
    handleItemClick(index) {
        const action = getDeleteTodoItemAction(index);
        dispatch(action);
    }
})

//通过 connect 方法将 TodoList 连接 store，遵守两个映射规则，获取 store 内的数据
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
//返回的是一个 容器组件，是将 UI 组件和逻辑结合。