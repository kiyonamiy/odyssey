const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');

// 读取文件
fs.readFile(fileName, (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    // 问题：想象极端情况，如果一个文本 5g ，那这个是一次性读取， data 就是 5g 。撑爆内存。
    console.log(data.toString());          
})
// data === <Buffer 31 32 33 0d 0a 34 35 36 0d 0a 37 38 39>
// 分别对应           1  2  3    \n  4  5  6    \n  7  8  9
// typeof data === object
// data 是一个 二进制类型，需要转换为字符串 

// 写入文件
const content = "这是新写入的内容\n";
const opt = {
    flag: 'a'       // 追加写入
}
// 问题：每次都写入一行，这是一个很费时的操作。
// 问题：如果一次性写入的 content 达到 5 个 g 。内存依旧撑爆。
fs.writeFile(fileName, content, opt, (err) => {
    if(err) {
        console.error(err);
        return;
    }
});

// 判断文件是否存在
fs.exists(fileName, exist => {
    console.log('exist', exist);
})