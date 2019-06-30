const http = require('http');

class MyExpress {
    constructor() {
        this.routeSettings = {
            all: [],
            get: [],
            post: []
        }
    }

    /**
     * 外部使用
     */
    use(...args) {
        const routeSetting = this.register(...args);
        this.routeSettings.all.push(routeSetting);
    }

    get(...args) {
        const routeSetting = this.register(...args);
        this.routeSettings.get.push(routeSetting);
    }

    post(...args) {
        const routeSetting = this.register(...args);
        this.routeSettings.post.push(routeSetting);
    }

    listen(...args) {
        const server = http.createServer(this.serverHandler());
        server.listen(...args);
    }

    // 内部函数

    /**
     * 读取每一条配置，一条配置中有一个路径，有一个或者多个中间件
     */
    register(path, ...middleWare) {
        const routeSetting = {};
        routeSetting.queue = [];
        if(typeof path === 'string') {
            routeSetting.path = path;
        } else {
            routeSetting.path = '/';
            routeSetting.queue.push(path);      // 说明第一个参数就是 中间件
        }
        routeSetting.queue.push(...middleWare);
        return routeSetting;
    }

    /**
     * http.createServer() 中的回调函数
     */
    serverHandler() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(data));
            }
            const url = req.url;
            const method = req.method.toLowerCase();
            const resultList = this.match(method, url);
            this.handle(req, res, resultList);
        }
    }

    /**
     * 根据上面整理出来的配置，判断这条 url 需要经过哪些配置处理
     */
    match(method, url) {
        let queue = [];
        if(url === '/facicon.ico') {
            return queue;
        }

        let curRouteSettings = [];
        // 有 bug !!!
        // 若是最后出现 use ，那顺序就排到 get 前面。比如 最后一个 use 是处理 404 ，结果这里跑到所有 get 请求前面，使所有页面都是 404 。
        curRouteSettings.push(...this.routeSettings.all);
        curRouteSettings.push(...this.routeSettings[method]);

        curRouteSettings.forEach(routeSetting => {
            if(url.includes(routeSetting.path)) {
                queue.push(...routeSetting.queue);
            }
        });
        return queue;
    }

    // 核心 next 机制
    handle(req, res, queue) {
        const next = () => {
            const middleWare = queue.shift();
            if(middleWare) {
                middleWare(req, res, next);
            }
        }
        next();     // 只执行一次
    }
}

// 工厂模式
module.exports = () => new MyExpress();