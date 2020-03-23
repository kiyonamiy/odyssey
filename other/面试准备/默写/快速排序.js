function sort(arr) {
  const partion = (left, right) => {
    const pivot = arr[left];
    while (left < right) {
      while (left < right && arr[right] > pivot) {
        right--;
      }
      arr[left] = arr[right];

      while (left < right && arr[left] < pivot) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
  };

  const quickSort = (left, right) => {
    if (left < right) {
      const pivotIndex = partion(left, right);
      quickSort(left, pivotIndex - 1);
      quickSort(pivotIndex + 1, right);
    }
  };

  quickSort(0, arr.length - 1);
}

const arr = [4, 3, 2, 1, 5, 9, 10];
sort(arr);
console.log(arr);
