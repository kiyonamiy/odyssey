const router = require('koa-router')();

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body;
    ctx.body = {
        errno: 0,
        username,
        password,
    }
})

router.get('/session-test' , async (ctx, next) => {
    ctx.body = {
        errno: 0,
        name: 'Kiyonami',
    }
    let viewCount = ctx.session.viewCount || 0;
    ctx.session.viewCount = ++ viewCount;
    
    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount
    }
})

module.exports = router;