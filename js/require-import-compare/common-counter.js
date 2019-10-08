exports.count = 0;

setTimeout(() => {
    console.log(`increase count to ${++exports.count} in counter.js after 500ms`)
}, 500);