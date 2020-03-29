console.log("script start");
setTimeout(function() {
  console.log("setTimeout start");

  new Promise((resolve, reject) => {
    // 自己加戏
    console.log("inner Promise");
    resolve();
  })
    .then(() => {
      console.log("inner promise1-1");
    })
    .then(() => {
      console.log("inner promise1-2");
    })
    .then(() => {
      console.log("inner promise1-3");
    });

  Promise.resolve()
    .then(() => {
      console.log("inner promise2=1");
    })
    .then(() => {
      console.log("inner promise2=2");
    });
  console.log("setTimeout end");
}, 0);

Promise.resolve()
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });
console.log("script end");

// script start
// script end
// promise1
// promise2
// setTimeout start
// inner Promise
// setTimeout end
// inner promise1-1
// inner promise2=1
// inner promise1-2
// inner promise2=2
// inner promise1-3
