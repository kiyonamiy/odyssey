console.log("script start");

async function async1() {
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2 end");
}

async1();

setTimeout(function() {
  console.log("setTimeout");
}, 0);

new Promise(resolve => {
  console.log("Promise");
  resolve();
})
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });

console.log("script end");

// 一宏
// script start
// async2 end   // awiat async2(); 相当于 new Promise((resolve, reject) => { async2(); resolve();}) // 后面的都是 .then()
// Promise
// script end
// 全微
// async1 end
// promise1
// promise2   // 已经 resolved 状态下，onFulfilledCallbacks 全部执行，想源码
// 一宏
// setTimeout
