// 如果浏览器支持
if (navigator.serviceWorker) {
  // 注册
  navigator.serviceWorker
    .register("./service-worker.js", { scope: "./" }) // ./所有都会被拦截
    // 成功回调
    .then(function(registration) {
      console.log(registration);
    })
    .catch(function(error) {
      console.log(error);
    });
} else {
  alert("service worker is not supported!");
}
