const store = createStore(reducer); // { subscribe, dispatch, getState }
const next = store.dispatch;

// 日志记录中间件
const loggerMiddleware = (action) => {
    console.log('this state', store.getState());
    console.log('action', action);
    next(action);       // store.dispatch(action)   // 耦合
    console.log('next state', store.getState());
}

// 异常记录中间件
const exceptionMiddleware = (action) => {
    try {
      /*next(action)*/
      loggerMiddleware(action);     // 耦合
    } catch (err) {
      console.error('错误报告: ', err)
    } 
  }

// 重写 store.dispatch
store.dispatch = exceptionMiddleware;