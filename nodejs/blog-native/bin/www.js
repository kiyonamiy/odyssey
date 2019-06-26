const http = require('http');

const serverHandle = require('../app');
const PORT = 8000;

const server = http.createServer(serverHandle);

server.listen(PORT);
//更多是 server 相关的技术