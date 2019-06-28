// 网络请求
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        req.pipe(res);      // 最重要
        console.log(res);
    }
});

server.listen(8000);