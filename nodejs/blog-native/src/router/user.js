const { SuccessModel, ErrorModel } = require('../model/resModel');
const { loginCheck } = require('../controller/user');

const userRouterHandle = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        return loginCheck(username, password).then(data => {
            if(data.username) {
                return new SuccessModel();
            }
            return new ErrorModel('登录失败');
        })
    }
}

module.exports = userRouterHandle;