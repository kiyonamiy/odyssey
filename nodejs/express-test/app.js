const express = require('express');

const app = express();


/**
 * !!!如果第一个参数不是路由，即默认根路由，等价于 app.use('/', (req, res, next) => ...)
 * 以下三个 use 会按顺序先后执行（next），相当于统一预处理请求
 * next 参数是一个函数，表示会执行下一个路由匹配的中间件
 * 第二个函数参数(req, res, next) => {} 就是中间件，它符合 express 的一些规则而实现
 */
app.use(/*'/',*/(req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next();
})
app.use((req, res, next) => {
    // 假设在这里处理 cookie 
    req.cookie = {
        userId: 'abc1234'
    }
})
app.use((req, res, next) => {
    // 假设处理 post data
    // 模拟异步
    // 注意 next 在内部
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next();
    })
})

/**
 * 相当于统一预处理请求 /api
 */
app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由');
    next();
})
/**
 * 相当于统一预处理请求 /api 且是 get 请求
 */
app.get('/api', (req, res, next) => {
    console.log('get /api 路由');
    next();
})
/**
 * 相当于统一预处理请求 /api 且是 post 请求
 */
app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next();
})
/**
 * 处理 /api/get-cookie 且是 get 请求
 * 注意没有 next()
 */
app.get('/api/get-cookie', (req, res, next) => {
    console.log('get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.use((req, res, next) => {
    console.log('处理 404');
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})