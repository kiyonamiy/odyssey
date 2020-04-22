const deepCopy = function(obj) {
  if (obj == null) {
    return null;
  }
  // 数组只是特殊的Object
  if (typeof obj !== "object") {
    return;
  }
  const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    // for-in还会往原型链上遍历
    // 不取这个对象原型上的
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};

/**
 * 数组遍历测试
 */
Array.prototype.myProto = "for-in";
const arr = ["a", "b", "c"];
arr.test = "bad";

for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]); // a, b, c
}

arr.forEach((value, index) => {
  console.log(index, value); // a, b, c
});

for (let key in arr) {
  console.log(key, arr[index]); // a, b, c, bad, for-in
}
