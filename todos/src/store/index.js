import {
    createStore
} from 'redux';
import reducer from './reducer';

//第二个参数是为了配置浏览器 redux 扩展
export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
