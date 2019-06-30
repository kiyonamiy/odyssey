const http = require('http');

const USE = 'USE';
const GET = 'GET';
const POST = 'POST';

class MyExpress {
    constructor() {
        this.routeSettings = [];
    }
    
// ---------------------------------------- 外部函数 ---------------------------------

    use(...args) {
        this.doRegister(USE, ...args);
    }

    get(...args) {
        this.doRegister(GET, ...args);
    }

    post(...args) {
        this.doRegister(POST, ...args);
    }

    // put delete 类似，省略

    listen(...args) {
        const server = http.createServer(this.serverHandler());
        server.listen(...args);
    }

// ---------------------------------------- 内部函数 ---------------------------------

    doRegister(method, ...args) {
        const routeSetting = this.register(...args);
        routeSetting.method = method;
        this.routeSettings.push(routeSetting);      // 所有的配置都按设置顺序匹配执行!!!
    }

    // 读取每一条配置，一条配置中有一个路径，有一个或者多个中间件
    register(...args) {
        const routeSetting = {};
        routeSetting.execQueue = [];
        if(typeof args[0] === 'string') {
            routeSetting.path = args[0];
            routeSetting.execQueue.push(...args.slice(1));
        } else {
            routeSetting.path = '/';
            routeSetting.execQueue.push(...args);
        }
        return routeSetting;
    }

    // http.createServer() 中的回调函数
    serverHandler() {
        return (req, res) => {
            res.json = data => {
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(data));
            }
            const method = req.method;
            const url = req.url;
            const curExecQueue = this.match(method, url);
            this.handle(req, res, curExecQueue);
        }
    }

    // 匹配该 url 所有需要执行的中间件
    match(method, url) {
        const curExecQueue = [];

        if(url === '/facicon.ico') {
            return curExecQueue;
        }

        for(let routeSetting of this.routeSettings) {
            if(url.includes(routeSetting.path) && (routeSetting.method === USE || routeSetting.method === method)) {    // 路径包含 且 请求方法对应
                curExecQueue.push(...routeSetting.execQueue);
            }
        }

        return curExecQueue;
    }

    // next!!! 自动执行 下一个中间件
    handle(req, res, curExecQueue) {
        const next = () => {
            const curMiddleWare = curExecQueue.shift();
            if(curMiddleWare) {
                curMiddleWare(req, res, next);
            }
        }
        next();
    }

}

module.exports = () => new MyExpress();