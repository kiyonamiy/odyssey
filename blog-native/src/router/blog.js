const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');

const blogRouterHandle = (req, res) => {
    const method = req.method;
    const path = req.path;
    const id = req.query.id;    //说明 id 默认是放在 url 上


    if(method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getList(author, keyword);

        //返回的也是一个 promise
        return result.then(rowDataPacket => {
            return new SuccessModel(rowDataPacket);
        })
    }
    if(method === 'GET' && path === '/api/blog/detail') {
        return getDetail(id).then(oneBlog => new SuccessModel(oneBlog));
    }
    if(method === 'POST' && path === '/api/blog/new') {
        req.body.author = "假数据";
        req.body.createtime = Date.now();
        return newBlog(req.body).then(insertId => new SuccessModel(insertId));
    }
    if(method === 'POST' && path === '/api/blog/update') {
        return updateBlog(id, req.body).then(result => {
            if(result) {
                return new SuccessModel();
            }
            return new ErrorModel('更新博客失败');
        });
    }
    if(method === 'POST' && path === '/api/blog/del') {
        const author = '假数据';
        return delBlog(id, author).then(result => {
            if(result) {
                return new SuccessModel();
            }
            return new ErrorModel('删除博客失败');
        });
    }
}

module.exports = blogRouterHandle;
