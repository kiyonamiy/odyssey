function mySort(arr) {
  const partition = function(left, right) {
    const pivot = arr[left];
    while (left < right) {
      // 把小的往左边扔
      while (left < right && arr[right] >= pivot) {
        right--;
      }
      arr[left] = arr[right]; // 跳出循环条件1，如果没有 arr[right]小于pivot的，则会left == right，并没有影响 // 把大的往右边扔
      while (left < right && arr[left] < pivot) {
        left++;
      }
      arr[right] = arr[left]; // 跳出循环条件2，之前 arr[left] = arr[right]，那right位置的元素重复，所以覆盖没问题（第一次是pivot有副本最后变回去
    } // 直到 left right 相遇，把 pivot 放到相遇点上
    arr[left] = pivot;
    return left;
  };

  const quickSort = function(left, right) {
    // left == right, 即一个元素，无需继续排序
    if (left < right) {
      const pivotIndex = partition(left, right); // 递归调用
      quickSort(left, pivotIndex - 1);
      quickSort(pivotIndex + 1, right);
    }
  };

  quickSort(0, arr.length - 1); // 闭区间
}

const arr1 = [1, 3, 5, 4, 1, 9];
mySort(arr1);
console.log(arr1);
