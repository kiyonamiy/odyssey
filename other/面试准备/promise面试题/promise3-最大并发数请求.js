// 有 8 个图片资源的 url，已经存储在数组 urls 中（即urls = ['http://example.com/1.jpg', …., 'http://example.com/8.jpg']），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。

// 但是我们要求，任意时刻，同时下载的链接数量不可以超过 limit 个。

// 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

const urls = [
  "first.jpg",
  "second.jpg",
  "third.png",
  "forth.png",
  "fifth.jpg",
  "sixth.png",
  "seven.gif",
  "eighth.gif"
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    // const img = new Image();
    // img.onload = function() {
    //   console.log(`${url} ok`);
    //   resolve();
    // };
    // img.onerror = reject;
    // // 发起请求
    // img.src = url;
    const time = Math.random() * 1000;
    setTimeout(() => {
      console.log("==请求成功==", url, time);
      resolve();
    }, time);
  });
}

function limitLoad(urls, handler, limit) {
  // 准备好窗口
  const promiseList = [];
  for (let i = 0; i < limit; i++) {
    promiseList.push(Promise.resolve(i)); // i 为了下面能够统一
  }

  let promise = Promise.race(promiseList);
  for (let url of urls) {
    promise = promise.then(index => {
      // 此时的 index 即为完成的下标，替换新的
      promiseList[index] = handler(url).then(() => index);
      // console.log(`${index} 窗口请求 ${url}`); // 测试
      return Promise.race(promiseList); // 持续竞速
    });
  }
}

limitLoad(urls, loadImg, 4);
