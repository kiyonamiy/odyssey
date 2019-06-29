const crypto = require('crypto');

const SECRET_KEY = 'Kiyonami_1234%';

// md5 加密
const md5 = content => {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

// 加密函数
const genPassword = password => {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

