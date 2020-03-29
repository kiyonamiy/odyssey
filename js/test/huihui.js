Function.prototype.throttle = function(wait) {
  let timeout = null;

  return function() {
    if (timeout != null) {
      return;
    }
    timeout = setTimeout(() => {
      this();
      timeout = null;
    }, wait);
  };
};
