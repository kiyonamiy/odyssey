var obj = {
  fn: function() {
    console.log(this);
    return () => {
      console.log(this);
      (function() {
        console.log(this);
      })();
      setTimeout(function() {
        console.log(this);
      }, 1);
    };
  }
};

obj.fn()();
