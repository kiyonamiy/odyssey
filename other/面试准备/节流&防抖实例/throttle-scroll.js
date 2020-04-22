function scrollBottom() {
  // 取数字还是有问题！！！
  const scrollTop = document.body.scrollTop;
  const clientHeight = document.body.clientHeight; // 可视窗口
  const scrollHeight = document.body.scrollHeight;
  console.log(
    "判断一下滚动到底了吗？",
    `${scrollTop} + ${clientHeight} = ${scrollHeight}`
  );
  if (scrollTop + clientHeight === scrollHeight) {
    console.log("！！！到底啦！！！");
  }
}

function throttle(fn, wait) {
  let timeoutId = null;

  return function (...args) {
    if (timeoutId != null) {
      return;
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };
}

window.onscroll = throttle(scrollBottom, 1000);

// 构造长页面
window.onload = function () {
  const rootDiv = document.getElementById("root");
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.style.height = "100px";
    div.style.background =
      "hsla(" + Math.floor(Math.random() * 360) + ",100%,50%,1)";
    fragment.appendChild(div);
  }
  rootDiv.appendChild(fragment);
};
