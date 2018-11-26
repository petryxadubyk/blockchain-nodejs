const Block = require('./block');
const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

const EC = require('elliptic').ec;
const ec = new EC("secp256k1");

//use keygenerator.js to generate public/private key pair
const myKey = ec.keyFromPrivate('010976d0f4000d342872cb2e2e8af555ca285bce27ccf77e6fce60855681f496');
const myWalletAddress = myKey.getPublic('hex');

let pdubykCoin = new Blockchain();

//INITIAL BLOCKCHAIN
// console.log("Mining block 1 ...");
// pdubykCoin.addBlock(new Block(1, '10/07/2018', { amount: 4 }));
// console.log("Mining block 2 ...");
// pdubykCoin.addBlock(new Block(2, '12/07/2018', { amount: 10 }));

//pdubykCoin.chain[1].data.amount = 100;
//pdubykCoin.chain[1].hash = pdubykCoin.chain[1].calculateHash();
//console.log('Is blockchain valid? ' + pdubykCoin.isChainValid());

//console.log(JSON.stringify(pdubykCoin, null, 4));

//TRANSACTIONS
// pdubykCoin.addTransaction(new Transaction('address 1', 'address 2', 100));
// pdubykCoin.addTransaction(new Transaction('address 2', 'address 1', 50));
// pdubykCoin.addTransaction(new Transaction('address 1', 'address 2', 200));

// console.log('\nStarting the miner...');
// pdubykCoin.minePendingTransactions('pdubyk-address');
// console.log('\nBalance of pdubyk-address is ', pdubykCoin.getBalanceOfAddress('pdubyk-address'));

//SIGNING TRANSACTIONS
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
pdubykCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
pdubykCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of pdubyk-address is ', pdubykCoin.getBalanceOfAddress(myWalletAddress));

console.log(JSON.stringify(pdubykCoin, null, 4));

//call next command to run in terminal with nodejs
//node src/main.js