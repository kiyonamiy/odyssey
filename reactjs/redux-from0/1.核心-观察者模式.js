/*------ count 的发布订阅者实践 ------*/
const state = {
    count: 1
}
const listeners = [];

// 订阅
function subscribe(listener) {
    listeners.push(listener);
}

// 改变时，遍历通知
function changeCount(count) {
    state.count = count;
    for(let i = 0; i < listeners.length; i ++) {
        const listener = listeners[i];
        listener();
    }
}

// 测试：注册两个订阅者
subscribe(() => {
    console.log(state.count);
})
subscribe(() => {
    console.log("hehehe" + state.count);
})

changeCount(3);
changeCount(4);