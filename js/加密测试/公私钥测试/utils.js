const crypto = require('crypto');

module.exports = {
    encrypt: (data, key) => {
        return crypto.publicEncrypt(key, Buffer.from(data));
    },
    decrypt: (encrypted, key) => {
        return crypto.privateDecrypt(key, encrypted);
    }
}