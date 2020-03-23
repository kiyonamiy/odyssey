function throttle(fn, wait) {
  let timeout = null;
  return function() {
    if (timeout != null) {
      return;
    }
    setTimeout(() => {
      fn();
      timeout = null;
    }, wait);
  };
}
