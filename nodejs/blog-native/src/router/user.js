const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');
const redis = require('../db/redis.js');

const userRouterHandle = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        return login(username, password).then(data => {
            if(data.username) {
                //设置 session
                req.session.username = data.username;
                req.session.realname = data.realname;
                redis.set(req.sessionId, req.session);      // 更新 redis 使对应的 user_id 有值
                return new SuccessModel();
            }
            return new ErrorModel('登录失败');
        })
    }
}

module.exports = userRouterHandle;