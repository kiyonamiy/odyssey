function throttle(fn, wait) {
  let timeoutId = null;

  return function () {
    if (timeoutId != null) {
      return;
    }
    timeoutId = setTimeout(() => {
      fn();
      timeoutId = null;
    }, wait);
  };
}

const span = document.getElementById("my-span");
const btn = document.getElementById("my-button");
btn.disabled = true;
btn.onclick = throttle(() => {
  console.log("发起抢购！");
}, 2000);

const getTargetTimePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(new Date("2020-04-12 17:00:00"));
  }, 200);
});

const getNowTimePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(new Date());
  }, 100);
});

Promise.all([getTargetTimePromise, getNowTimePromise]).then((valueResult) => {
  let [targetTime, nowTime] = valueResult;
  let diffTime = Math.floor((targetTime.getTime() - nowTime.getTime()) / 1000);
  const intervalId = setInterval(() => {
    span.innerText = diffTime;
    if (diffTime <= 0) {
      btn.disabled = false;
      clearInterval(intervalId);
    }
    diffTime -= 1;
  }, 1000);
});
