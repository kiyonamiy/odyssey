const utils = require('./utils');
const keys = require('./keys');

const plainText = "my word";
const crypted = utils.encrypt(plainText, keys.pubKey);
const decrypted = utils.decrypt(crypted, keys.privKey);

console.log(decrypted.toString());