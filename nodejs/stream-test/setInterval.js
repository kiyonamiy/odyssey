const TIME = 20;

let step = 1;
let width = 0;

// zcb 进度条
setInterval(() => {
    width = Math.log(step) / Math.log(TIME) * 100;
    console.log(step, width);
    step += 1;
}, 1000);