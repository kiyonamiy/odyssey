// const state = {
//     count: 1,
// }

// state.count = 2;


const state = {
    count: 1
}
const listeners = [];

/* 订阅 */
function subscribe(listener) {
    listeners.push(listener);
}
/* change count */
function changeCount(count) {
    state.count = count;
    for(let i = 0; i < listeners.length; i ++) {
        const listener =  listeners[i];
        listener();
    }
}

subscribe(() => {
    console.log(state.count);
})
subscribe(() => {
    console.log("hehehe" + state.count);
})

changeCount(3);
changeCount(4);