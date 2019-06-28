// 结合网络和文件 stream
const fs = require('fs');
const path = require('path');

const http = require('http');

const fileName = path.resolve(__dirname, 'data.txt');

const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        const readStream = fs.createReadStream(fileName);
        readStream.pipe(res);
    }
})
server.listen(8000);