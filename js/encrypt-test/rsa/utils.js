const crypto = require('crypto');
const { pubKey, privKey } = require('./keys');
const ENCODING = 'base64';

// 注意，第二个参数是Buffer类型（先加密，后解密

// 加密方法
exports.encrypt = (data) => {
  // 注意，第二个参数是Buffer类型
  return crypto.publicEncrypt(pubKey, Buffer.from(data));
};

// 解密方法
exports.decrypt = (encrypted) => {
  // 注意，encrypted是Buffer类型
  return crypto.privateDecrypt(privKey, encrypted);
};

// // 公钥加密---传入对象，返回加密后的字符串
// exports.encrypt = (data) => {
//     const encryptBuffer = crypto.publicEncrypt(pubKey, Buffer.from(JSON.stringify(data)));
//     return encryptBuffer.toString(ENCODING);
// };

// // 私钥解密---传入字符串，返回解析后的对象
// exports.decrypt = (encryptedContent) => {
//     const decryptedBuffer = crypto.privateDecrypt(privKey, Buffer.from(encryptedContent));
//     return JSON.parse(decryptedBuffer.toString(ENCODING));
// }