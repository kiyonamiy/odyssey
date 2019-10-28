const utils = require('./utils');

// const data = {
//     name: 'yuqingbo',
//     age: 16,
// }

const plainText = 'yuqingbo';

// const data = 'test';

// const encryptedStr = utils.encrypt(data);
// console.log(encryptedStr);

// const decryptedObj = utils.encrypt(encryptedStr);
// console.log(decryptedObj);

const crypted = utils.encrypt(plainText); // 加密
const decrypted = utils.decrypt(crypted); // 解密

console.log(decrypted.toString());