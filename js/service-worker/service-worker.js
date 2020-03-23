// 监听 service worker installing 状态
self.addEventListener("install", function(event) {
  // waitUntil 做完括号内的，再安装
  event.waitUntil(
    // 打开缓存，添加文件缓存
    caches.open("app-v1").then(function(cache) {
      console.log("open cache");
      // 服务器请求一遍，这里会再请求一遍
      return cache.addAll([
        "./app.js",
        "./index.html",
        "./index.css",
        "./service-worker.js"
      ]);
    })
  );
});

// 监听 service worker fetch 状态
self.addEventListener("fetch", function(event) {
  console.log("event", event);
  // 如果发起请求，则先去 caches 中寻找，找到了则返回，没有则发起请求
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        return res;
      } else {
        // 通过 fetch 方法发起网络请求
      }
    })
  );
});
