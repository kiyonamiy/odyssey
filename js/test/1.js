/**
 * 已有函数：生成一个二叉树
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */

const mergeTrees = function(t1, t2) {
  if (t1 == null) {
    return t2;
  }
  if (t2 == null) {
    return t1;
  }
  t1.val *= t2.val;
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);
  return t1;
};

// Greatest Common Divisor
const gcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};
// 就是有一种不断向后的感觉，b本来是第二位，拿到第一位，后面又出现了新的一位。
