const store = createStore(reducer);
const next = store.dispatch;    // 最后一步总是走原生 dispatch(action): state

// 将 下一步 做参数传递
const loggerMiddleware = (next) => (action) => {
    console.log('this state', store.getState());
    console.log('action', action);
    next(action);
    console.log('next state', store.getState());
  }
  
const exceptionMiddleware = (next) => (action) => {
    try {
        next(action);
    } catch (err) {
        console.error('错误报告: ', err)
    }
}

// 有点偏责任链模式
store.dispatch = exceptionMiddleware(loggerMiddleware(next));