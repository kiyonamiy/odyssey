const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null; // 用于保存 resolve 或者 reject 中传入的值 // resolve(data); // reject(err);
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    // 因为调用的上下文（setTimeout 内部），这里的 this 是 window，和 that 不等！
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.forEach(cb => cb(value)); // 遍历回调数组并执行
    }
  }
  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value; // 一开始我在纳闷，为什么要存储一份 value？因为在 then 中，一旦确定了状态，直接执行 cb，此时只能通过这里的 that.value 拿到。
      that.rejectedCallbacks.forEach(cb => cb(value));
    }
  }

  // 执行传入的 fn ！（上面都是一堆定义）
  try {
    fn(resolve, reject); // resolve, reject 函数在 promise 中定义
  } catch (e) {
    reject(e);
  }
}

// 实现 then 函数
// 这里可不能写成箭头函数阿！！！箭头函数 this 是上一层的，不是 new 出来的对象！查错半天。
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : e => {
          throw e;
        };

  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }
  // 如果状态已经发生改变，则直接执行，不需要存储
  if (that.state === RESOLVED) {
    onFulfilled(that.value);
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};

// new 是 resolve，reject
// then 是 onFulfilled, onRejected
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // 因为 setTimeout 是异步操作，所以内部的函数被压入栈，并没有执行，
    // 此时构造函数执行完毕，执行 then
    // 因为此时并没有执行 resolve() 函数，则状态依旧为pending，所以存入 resolvedCallbacks 队列中，等待 resolve 中的 foreach 。
    resolve(`my-promise`); // 发布者 相当于观察者模式的notifyAll(value)
  }, 0);
}).then(value => {
  console.log(1, value);
});
// 暂时不能链式调用
// .then(value => {
//   console.log(2, value);
// });
