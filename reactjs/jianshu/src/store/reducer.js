import { combineReducers } from 'redux-immutable';      // 从 redux 改为 redux-immutable ，使用的函数不变
import { reducer as headerReducer }  from '../common/header/store';

export default combineReducers({
    header: headerReducer
});