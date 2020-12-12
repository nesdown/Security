const fs = require('fs');
const crypto = require('crypto');
const sha1 = require('sha1');
const md5 = require('md5');

const passwords = fs.readFileSync('passwords100K.txt', 'ascii').split('\n');

const genSalt = () => crypto.randomBytes(16).toString('hex');

const getSha = pass => {
    const salt = genSalt();
    return sha1(pass + salt) + ', ' + salt;
};
const getMd5 = (pass) => md5(pass);

fs.writeFileSync('passwords_md5.csv', passwords.map(e => getMd5(e)).join('\n'));
fs.writeFileSync('passwords_sha.csv', passwords.map(e => getSha(e)).join('\n'));
