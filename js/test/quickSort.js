function mySort(nums) {
  const partition = function(left, right) {
    const pivot = nums[left];
    while (left < right) {
      while (left < right && nums[right] > pivot) {
        right--;
      }
      nums[left] = nums[right];
      while (left < right && nums[left] <= pivot) {
        left++;
      }
      nums[right] = nums[left];
    }
    nums[left] = pivot;
    return left;
  };
  const quickSort = function(left, right) {
    if (left < right) {
      const pivotIndex = partition(left, right);
      quickSort(left, pivotIndex - 1);
      quickSort(pivotIndex + 1, right);
    }
  };

  quickSort(0, nums.length - 1);
}

const testArray = [1, 2, 5, 3, 4, 9, 7, 7];
mySort(testArray);
