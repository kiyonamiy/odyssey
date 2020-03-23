// 数组扁平化

const arr = [1, 2, 3, [4, 5, [6, 7, 8, [9, 10], 11, 12]]];
arr
  .toString() // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  .split(",")
  .map(item => Number(item));
