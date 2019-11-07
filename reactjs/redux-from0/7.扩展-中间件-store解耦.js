const store = createStore(reducer);
const next  = store.dispatch;

// store，导致我们无法把中间件独立出去
// 那我们把 store 也作为一个参数传进去好了~
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

const logger = loggerMiddleware(store);
const exception = exceptionMiddleware(store);
store.dispatch = exception(logger(next));   // 但是最后的使用非常不友好，要自己嵌套