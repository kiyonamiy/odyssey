## 问题解答

### beforeAll(fn, timeout) 执行顺序？

- Runs a function before any of the tests in this file run.（注意是在所有的 test 之前，而不是在所有的 describe 之前；实际为先执行第一个文件的所有的 describe，再执行 beforeAll）；
- If the function returns a promise or is a generator, Jest waits for that promise to resolve before running tests.

### setupFiles 执行顺序？

每个文件都会重新执行一次，执行在最前面。

globalSetup 全局只执行一次（在所有 test suites 之前）。

### jest 的执行顺序是怎么样？

- 在同一个文件内（多个 describe）的情况下，按照书写顺序执行；
- 在同一个文件内（多个 describe）的情况下，多个 describe 的内容（在 test 之外的内容）都先按顺序执行，test 的内容再按顺序执行；
  - 官方解释：Jest 会在所有真正的测试开始之前执行测试文件里所有的 describe 处理程序（handlers）；当 describe 块运行完后，默认情况下，Jest 会按照 test 出现的顺序；
- 在多个文件的情况下，执行顺序不一定；

### 在多个测试用例使用 common 方法获得单例，是否会重复重新初始化对象？

- 在同一个文件内（多个 describe），是不会重复初始化；在多个文件内，会被重新初始化；

什么都不加情况，a b
加上倒序，还是 a b

加上 --runInBand 情况，b a
加上 --runInBand + 加上顺序，a b，说明此法有效。

sort

- return -1: 保持不变；
- return 1: 交换；

testEnvironment 可以自定义，实现 setup, teardown and getVmContext 三个方法。
相比于 setupFiles（每个文件都重新执行），它可以用在全局的初始化（只执行一次）。

想知道为什么 eslint vscode 不能自动格式化，跑一下 lint 命令就知道了（这次我少了 prettier）。

现在想要的是：

- 每次执行一个文件，根据文件名，决定是否需要 setContractVoteEnable （之前普通交易都不开启，bvm 相关的都要开启，且需要全局保存状态，只开启一次）；
