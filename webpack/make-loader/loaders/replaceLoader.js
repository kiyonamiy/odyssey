// const loaderUtils = require('loader-utils');
// const options = loaderUtils.getOptions(this);
// 不能箭头函数（因为 this
// 接收文件内容
module.exports = function(source) {
    console.log(this.query);    // 打印 options
    return source.replace('Kiyonami', 'KiyonamiYu');
    // this.callback(...);  // 相当于 return，但是能携带额外信息

    // const callback = this.async();    // 异步
    // setTimeout(() => {
        // const result = source.replace('Kiyonami', 'KiyonamiYu'),
        // callbacak(null, result);
    // })
}