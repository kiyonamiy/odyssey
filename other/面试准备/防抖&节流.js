// 防抖
function debounce(fn, wait) {
  let timeout = null;
  return function() {
    // ??? 为什么又触发我，我都给你分配了时间了，到时间他就会自动执行了，为什么来触发我
    if (timeout != null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait);
  };
}

// 节流
function throttle(fn, wait) {
  let timeout = null;

  return function() {
    if (timeout) {
      return;
    }
    timeout = setTimeout(function() {
      timeout = null;
      fn();
    }, wait);
  };
}
