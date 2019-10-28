const crypto = require('crypto');

const ENCODING = 'base64';

// public/data/key 已经产生的 key
const priv = crypto.createDiffieHellman(512);    // prime_length: number
const privKeys = priv.generateKeys();
const prime = priv.getPrime();
const generator = priv.getGenerator();

const primeStr = prime.toString(ENCODING);
const generatorStr = generator.toString(ENCODING);

console.log(prime);
console.log(generator);
// const pub = crypto.createDiffieHellman(Buffer.from(primeStr, ENCODING).writeUInt8(), Buffer.from(generatorStr, ENCODING).writeUInt8);
const pub = crypto.createDiffieHellman(prime, generator);
const pubKeys = pub.generateKeys();

const privSecret = priv.computeSecret(pubKeys);
const pubSecret = pub.computeSecret(privKeys);

console.log(privSecret.toString(ENCODING));
console.log(pubSecret.toString(ENCODING));