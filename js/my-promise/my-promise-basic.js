const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.onFulfilledCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.onFulfilledCallbacks.forEach(cb => cb(value));
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.onRejectedCallbacks.forEach(cb => cb(value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : err => {
          throw err;
        };
  if (that.state === PENDING) {
    that.onFulfilledCallbacks.push(onFulfilled);
    that.onRejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value);
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("my-promise-basic");
  }, 0);
}).then(value => {
  console.log(value);
});
