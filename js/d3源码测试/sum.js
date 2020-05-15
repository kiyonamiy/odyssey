function sum(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      console.log(value, +value, (value = +value));
      // 这还是一个赋值操作，将 value 转换为 数字（（字符串能转则转），不能转的都 NaN），保证 value 是一个数字
      // 又运用了一个 if 自动转换 boolean 类型（NaN 0 不参与运算）
      if ((value = +value)) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      // 也一样，返回值保证是一个数字
      if ((value = +valueof(value, ++index, values))) {
        sum += value;
      }
    }
  }
  return sum;
}

const nums = [1, 2, 3, "4", "abc", " ", , NaN, undefined];
console.log("result", sum(nums));

// value +value
// 1 1 1
// 2 2 2
// 3 3 3

// 4 4 4
// abc NaN NaN
// 0 0
// undefined NaN NaN
// NaN NaN NaN
// undefined NaN NaN

// result 10
