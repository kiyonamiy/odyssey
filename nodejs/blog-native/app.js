const querystring = require('querystring');
const blogRouterHandle = require('./src/router/blog');
const userRouterHandle = require('./src/router/user');
const redis = require('./src/db/redis');

// session 数据 （全局的 所有的 req 的 userid 都存储在此
// const SESSION_DATA = {};

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const AFTER_TIME = 24 * 60 * 60 * 1000;     // 一天后
    const d = new Date();
    d.setTime(d.getTime() + AFTER_TIME);
    return d.toGMTString();
}

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

    //解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';     //!!! k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return;
        }
        const arr = item.split('=');    //k1=v1
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    });

    // redis.get(userId).then(val => {
    //     if(val === null) {
    //         redis.set(userId, {});
    //     }
    // })

    //解析 session
    let needSetCookie = false;                  // 没有 userid 才需要设置
    let userId = req.cookie.userid;
    if(!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
    }
    req.sessionId = userId;             //为后期登录后插入 redis 做准备
    redis.get(userId).then(val => {
        if(val === null) {
            redis.set(userId, {});
        }
        return val;
    }).then(val => {
        // 拿到这条请求的 session
        req.session = val;
        getPostData(req).then(postData => {     // 拿到 resolve 返回的对象
            req.body = postData;                // 只有 post 方法才使用 req.body 对 get 无影响
            // 处理 blog 路由
            const blogResult = blogRouterHandle(req, res);  //!!! 通过打印，整个过程 blogResult = Promise { <pending> } 说明是交给另一个线程处理（主线程全程不管，也不使用）。
            if(blogResult) {
                blogResult.then(blogData => {
                    if(needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(blogData))
                })
                return;
            }
            //处理 user 路由
            const userResult = userRouterHandle(req, res);
            if(userResult) {                    //!!!因为可能不在整个路由内匹配，所以 promise 可能为空
                userResult.then(userData => {
                    if(needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(userData))
                });
                return;
            }
            //未命中路由，返回 404
            res.writeHead(404, {'Content-type': "text/plain"});
            res.write("404 Not Found\n");
            res.end();
        });
    });
}

module.exports = serverHandle;
//更多是业务配置