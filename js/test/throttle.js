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
