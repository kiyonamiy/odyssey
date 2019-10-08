const { count } = require('./common-counter');

// CommonJS 则是普通的值传递或者引用传递
setTimeout(() => {
    console.log(`read count after 1000ms in commonjs is ${count}`);
}, 1000);