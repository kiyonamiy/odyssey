let num = 0;

export default async function init(): Promise<number> {
  // 期望每次返回的 num 会 +1，说明每次测试对 num 的修改都是有效的，即说明单例有效
  return await new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      num += 1;
      resolve(num);
    }, 500 - num * 10);
  });
}

// 引用就会被调用
// 不会被覆盖，只会按顺序执行
beforeAll(() => {
  console.log("***========!!! beforeAll 1");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("***========!!! beforeAll 2");
      resolve("");
    }, 100);
  });
});
