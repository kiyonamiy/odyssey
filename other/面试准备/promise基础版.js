function MyPromise(fn) {
  const that = this;
  that.value = null;
  that.state = "pending";
  that.onFulfilledCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolve(value) {
    if (that.state != "pending") {
      return;
    }
    that.value = value;
    that.state = "resolved";
    that.onFulfilledCallbacks.forEach(cb => cb(value));
  }

  function reject(value) {
    if (that.state != "pending") {
      return;
    }
    that.value = value;
    that.state = "rejected";
    that.onRejectedCallbacks.forEach(cb => cb(value));
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilledCallback, onRejectedCallback) {
  const that = this;

  onFulfilledCallback =
    typeof onFulfilledCallback === "function" ? onFulfilledCallback : v => v;
  onRejectedCallback =
    typeof onRejectedCallback === "function"
      ? onRejectedCallback
      : err => {
          throw err;
        };

  if (that.state === "pending") {
    that.onFulfilledCallbacks.push(onFulfilledCallback);
    that.onRejectedCallbacks.push(onRejectedCallback);
  }

  if (that.state === "resolved") {
    onFulfilledCallback(that.value);
  }
  if (that.state === "rejected") {
    onRejectedCallback(that.value);
  }
};

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("my-promise-basic");
  }, 0);
}).then(
  value => {
    console.log(value);
  },
  value => {
    console.log(`reject ${value}`);
  }
);
