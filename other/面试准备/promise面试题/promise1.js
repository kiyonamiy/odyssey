const button1 = document.getElementById("promise1-button1");
const button2 = document.getElementById("promise1-button2");

// !!!
// 如果只是单纯的promise.then().then(); 虽然是按顺序执行，但是内部如果是setTimeout之类的异步操作，并不能保证顺序。
// 返回一个新的 promise 为了清空状态；等内部再 resolve 确定状态，再往下.then()。
let promise = Promise.resolve();

// 最后的结果要和 click 打印的顺序一致
// 测试的话，最好在 3s 内点击两个按钮，这样可以直观显示点击顺序。

button1.onclick = () => {
  console.log("1=> onclick");
  // 虽然这种写法也是返回一个promise，但是此时的 promise 状态是已经确定为 resolved，（需要使用pending状态阻止继续，）所以不能按照点击顺序执行！
  // promise = promise.then(() => {
  //   setTimeout(() => {
  //     console.log(`1. data ${Math.random()}`);
  //   }, 3000);

  // 两个promise有联系（比如需要按照顺序；比如要向下一个传递 value），使用下面这种方式
  // 需要 赋值给 全局变量 promise，为了 button2 点击后，拿到此时的 promise1
  promsie = promise.then(value => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`1. data ${Math.random()}`);
        resolve();
      }, 3000);
    });
  });
};

button2.onclick = () => {
  console.log("2=> onclick");
  promise = promise.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`2. data ${Math.random()}`);
        resolve();
      }, 5000);
    });
  });
};

// const promise1 = new Promise((resolve, reject) => {
//   // setTimeout(() => {
//   resolve(1);
//   // }, 1000);
// });
// console.log(promise1);

// const promise2 = promise1.then(value => {
//   return value;
// });
// console.log(promise2);

// const promise3 = promise2.then(value => {
//   return new Promise((resolve, reject) => {
//     resolve(3);
//   });
// });
// console.log(promise3);

// const promise4 = promise3.then(value => {
//   console.log(value);  // 是数字 3，并不是 promise
// });
// console.log(promise4);

// const promise5 = promise4.then(value => {});
// console.log(promise5);
