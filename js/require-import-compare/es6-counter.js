let count = 0;

setTimeout(() => {
    console.log(`increase count to ${++count} in counter.js after 500ms`)
}, 500);

export default count;