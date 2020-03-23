console.log("promise2-mergePromise");

const timeout = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

// ajax1 是一个函数，返回一个带 then 的 promise
const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

//题目要求实现
const mergePromise = ajaxArray => {
  const data = [];

  let promise = Promise.resolve();
  ajaxArray.forEach(ajax => {
    // 传入的是一个函数，这个函数返回的是一个 promise
    promise = promise.then(ajax).then(value => {
      data.push(value);
    });
  });

  return promise.then(() => data);
};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 自己写的版本，也可以
// const mergePromise = ajaxArray => {
//   // 题目实现
//   const result = [];
//   let promise = Promise.resolve();
//   ajaxArray.forEach(ajax => {
//     promise = promise.then(() => {
//       return new Promise((resolve, reject) => {
//         ajax().then(value => {
//           result.push(value);
//           resolve();
//         });
//       });
//     });
//   });
//   return promise.then(() => result);
// };
