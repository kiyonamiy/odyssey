const express = require('./libs/my-express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('1. 请求开始...', req.method, req.url);
    next();
})
app.use((req, res, next) => {
    // 假设在这里处理 cookie 
    console.log('2. 模拟处理 cookie');
    req.cookie = {
        userId: 'abc1234'
    }
    next();
})
app.use((req, res, next) => {
    // 假设处理 post data
    setTimeout(() => {
        console.log('3. 模拟处理 postdata');
        req.body = {
            a: 100,
            b: 200
        }
        next();
    })
})


app.use('/api', (req, res, next) => {
    console.log('4. 处理 /api 路由');
    next();
})

app.get('/api', (req, res, next) => {
    console.log('5. get /api 路由');
    next();
})

app.post('/api', (req, res, next) => {
    console.log('5. post /api 路由');
    next();
})

app.get('/api/get-cookie', (req, res, next) => {
    console.log('6. get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/post-cookie', (req, res, next) => {
    console.log('6. post /api/post-cookie');
    res.json({
        method: req.method,
        url: req.url
    });
})

app.use((req, res, next) => {
    console.log('7. 处理 404');
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})

app.listen(8000, () => {
    console.log('server is running on port 8000');
})