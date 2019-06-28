// 复制文件
const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, 'data-bak.txt');

const readStream = fs.createReadStream(fileName1);
const writeStream = fs.createWriteStream(fileName2);

readStream.pipe(writeStream);       // 读取 data.txt 写到 data.txt 中

// readStream.on('data', chunk => {    // 可以监听每一次的读取内容
//     console.log(chunk); 
// })
readStream.on('end', () => {
    console.log('copy done');
})