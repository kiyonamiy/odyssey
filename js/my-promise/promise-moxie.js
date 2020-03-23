new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("my-promise");
  });
}).then(value => {
  console.log("1", value);
});

function MyPromise(fn) {
  const that = this;
  that.state = "pending";
  that.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (that.state === "pending") {
      that.state = "resolved";
      that.value = value;
      that.resolvedCallbacks.forEach(cb => cb(value));
    }
  }

  function reject(value) {
    if (that.state === "pending") {
      that.state = "rejected";
      that.value = value;
      that.rejectedCallbacks.forEach(cb => cb(value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected = typeof onRejected === "function" ? onRejected : v => v;

  if (that.state === "pending") {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }
  if (that.state === "resolved") {
    onFulfilled(that.value);
  }
  if (that.state === "rejected") {
    onRejected(that.value);
  }
};
