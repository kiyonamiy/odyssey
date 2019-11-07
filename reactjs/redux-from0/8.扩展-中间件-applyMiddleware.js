const applyMiddleware = function(...middlewares) {
    /*返回一个重写createStore的方法*/
    return function rewriteCreateStoreFunc(oldCreateStore) {
        /*返回重写后新的 createStore*/
        return function newCreateStore(reducer, initState) {
            /*1. 生成store*/
            const store = oldCreateStore(reducer, initState);
            
            const chain = middlewares.map(middleware => middleware(store));  /*给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/ /* const chain = [exception, time, logger]*/
            let dispatch = store.dispatch;
            chain.reverse().map(middleware => {     /* 实现 exception(time((logger(dispatch))))*/
                dispatch = middleware(dispatch);
            });
        }
    }
}

const createStore = (reducer, initState, rewriteCreateStoreFunc) => {
    /*如果有 rewriteCreateStoreFunc，那就采用新的 createStore */
    if(rewriteCreateStoreFunc){
       const newCreateStore = rewriteCreateStoreFunc(createStore);
       return newCreateStore(reducer, initState);
    }
    /*否则按照正常的流程走*/
    // ...
}

const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware);

const store = createStore(reducer, initState, rewriteCreateStoreFunc);