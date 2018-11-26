const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC("secp256k1");

module.exports = class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        //this hash we are going to sign, not the whole transaction
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        //signingKey - is the key object like one in keygenerator.js

        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error("You cannot signtransactions for other wallets!");
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true; //this is the case of awarding transaction for miners

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}