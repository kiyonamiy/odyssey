第一题：
4 4 4 4

第二题：
function myDP() {
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

第三题：
undefined
0
0
0

// 上一个传进来的作为 b
undefined
0
2
4


undefined
good
bad
bad

for (var i = 0; i < 4; i++) {
  setTimeout((function(num) {
    return function() {
      console.log(num);
    }
  })(i), 300);
}