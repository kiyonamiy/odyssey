const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');


// 统一的登录验证函数
const loginCheck = req => {
    if(!req.session.username) {     // 其实完全没必要这么验证阿？不应该只是没有 userid 就不继续了吗。登录成功再给 cookie 赋值 userid 不就行了嘛
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}

const blogRouterHandle = (req, res) => {
    const method = req.method;
    const path = req.path;
    const id = req.query.id;    //说明 id 默认是放在 url 上

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';

        if(req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req);
            if(loginCheckResult) {
                //未登录
                return loginCheckResult;
            }
            // 强制查询自己的博客
            author = req.session.username;
        }

        //返回的也是一个 promise
        return getList(author, keyword).then(rowDataPacket => {
            return new SuccessModel(rowDataPacket);
        })
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        return getDetail(id).then(oneBlog => new SuccessModel(oneBlog));
    }

    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req);
        if(loginCheckResult) {  // 未登录返回 promise ，登录无返回
            return loginCheckResult;
        }

        req.body.author = req.session.username;
        req.body.createtime = Date.now();
        return newBlog(req.body).then(insertId => new SuccessModel(insertId));
    }

    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {

        const loginCheckResult = loginCheck(req);
        if(loginCheckResult) {  // 未登录返回 promise ，登录无返回
            return loginCheckResult;
        }

        return updateBlog(id, req.body).then(result => {
            if(result) {
                return new SuccessModel();
            }
            return new ErrorModel('更新博客失败');
        });
    }

    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/del') {

        const loginCheckResult = loginCheck(req);
        if(loginCheckResult) {  // 未登录返回 promise ，登录无返回
            return loginCheckResult;
        }

        const author = req.session.username;
        return delBlog(id, author).then(result => {
            if(result) {
                return new SuccessModel();
            }
            return new ErrorModel('删除博客失败');
        });
    }
}

module.exports = blogRouterHandle;
