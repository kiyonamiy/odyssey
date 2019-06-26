const { SuccessModel, ErrorModel } = require('../model/resModel');
const { loginCheck } = require('../controller/user');

const userRouterHandle = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const result = loginCheck(username, password);
        if(result) {
            return new SuccessModel();
        } else {
            return new ErrorModel("账号或者密码错误");
        }
    }
}

module.exports = userRouterHandle;