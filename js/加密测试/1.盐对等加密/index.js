const crypto = require('crypto');

const monthData = '123443531111111111';
const KEY = 'yuqingbo';

// 加密
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    cipher.update(data, 'utf8', 'hex');
    return cipher.final('hex');
}

// 解密
function aesDecrypt(encrypt, key) {
    const decipher = crypto.createDecipher('aes192', key);
    decipher.update(encrypt, 'hex', 'utf8');
    return decipher.final('utf8');
}

const encrypt = aesEncrypt(monthData, KEY);
console.log(encrypt);

const data = aesDecrypt(encrypt, KEY);
console.log(data);