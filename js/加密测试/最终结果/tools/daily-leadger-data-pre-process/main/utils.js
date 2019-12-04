const crypto = require('crypto');

// 对等加密
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    cipher.update(data, 'utf8', 'hex');
    return cipher.final('hex');
}

// 对等解密
function aesDecrypt(encrypt, key) {
    const decipher = crypto.createDecipher('aes192', key);
    decipher.update(encrypt, 'hex', 'utf8');
    try {
        const decrypted = decipher.final('utf8');
    } catch(e) {
        console.log('解密出现错误');
    }
    return decrypted;
}

module.exports = {
    aesEncrypt,
    aesDecrypt,
}