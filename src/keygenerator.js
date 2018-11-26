const EC = require('elliptic').ec;
const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key: ', privateKey);

console.log();
console.log('Public key: ', publicKey);

//generate the keys with next command and save them
//node src/keygenerator.js

//Private key:  010976d0f4000d342872cb2e2e8af555ca285bce27ccf77e6fce60855681f496
//Public key:  043af2ab7ac5406a48c2f36d96b9492e9606bfccd78b2d3720a41f378dbbf20de1486e3f0cfa6ab37811a7ff0ef1b0b61db6a603c1b56a3bf116dc7611a9d99295