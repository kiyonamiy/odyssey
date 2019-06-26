const querystring = require('querystring');
const blogRouterHandle = require('./src/router/blog');
const userRouterHandle = require('./src/router/user');

// 用于处理 post data
const getPostData = (req) => new Promise((resolve, reject) => {
    //对以下情况做忽略
    if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
        resolve({});
        return;
    }
    let postData = '';
    //因为是异步的
    req.on('data', chunk => {
        postData += chunk.toString();
    });
    req.on('end', () => {
        if(!postData) {
            resolve({});
            return;
        }
        resolve(JSON.parse(postData));
    })
});

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');
    // 获取 path
    req.path = req.url.split('?')[0];
    // 解析 query (构造对象
    req.query = querystring.parse(req.url.split('?')[1]);

    getPostData(req).then(postData => {     // 拿到 resolve 返回的对象
        req.body = postData;                // 只有 post 方法才使用 req.body 对 get 无影响

        // 处理 blog 路由
        const blogResult = blogRouterHandle(req, res);  //!!! 通过打印，整个过程 blogResult = Promise { <pending> } 说明是交给另一个线程处理（主线程全程不管，也不使用）。
        if(blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return;
        }
        //处理 user 路由
        const userResult = userRouterHandle(req, res);
        if(userResult) {                    //因为可能不在整个路由内匹配，所以 promise 可能为空
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            });
            return;
        }
        //未命中路由，返回 404
        res.writeHead(404, {'Content-type': "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    });
}

module.exports = serverHandle;
//更多是业务配置