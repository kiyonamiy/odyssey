// ---- 退订 ----
function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
}

const unsubscribe = store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count);
});

/*退订*/
unsubscribe();

// ---- 中间件拿到 store ----

/*const chain = middlewares.map(middleware => middleware(store));*/
const simpleStore = { getState: store.getState };
const chain = middlewares.map(middleware => middleware(simpleStore));


// ---- compose ----

// 之前 我们的 applyMiddleware 中，把 [A, B, C] 转换成 A(B(C(next)))，是这样实现的
const chain = [A, B, C];
let dispatch = store.dispatch;
chain.reverse().map(middleware => {
   dispatch = middleware(dispatch);
});

// redux 提供了一个 compose 方式，可以帮我们做这个事情
const chain = [A, B, C];
dispatch = compose(...chain)(store.dispatch)

// 实现
export default function compose(...funcs) {
    if (funcs.length === 1) {
      return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// ---- 省略initState ----

// ---- bindActionCreators ----