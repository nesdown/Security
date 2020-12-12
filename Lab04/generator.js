const fs = require('fs');

const top100 = fs.readFileSync('top100passwords.txt', 'ascii').split('\n');
const top100K = fs.readFileSync('top100K.txt', 'ascii').split('\n');

const randomInt = (min, max) => min + Math.floor(Math.random() * max);

const fromTop100 = () => top100[randomInt(0, 99)];
const fromTop100K = () => top100K[randomInt(1, 99999)];

const symbols = () => {
    let symbols = [];
    for (let i = 0; i < 62; ++i) {
        if (i < 10) {
            symbols.push(i);
        } else if (i < 36) {
            symbols.push(String.fromCharCode(i + 55));
        } else {
            symbols.push(String.fromCharCode(i + 61));
        }
    }
    return symbols;
}

const alphabet = symbols();

const reallyRandom = () => {
    const n = randomInt(4, 20);
    let str = "";
    for (let i = 0; i < n; ++i) {
        str += alphabet[randomInt(0, 61)];
    }
    return str;
}

const combined = () => {
    const n = randomInt(0, 100);
    if (n < 10) {
        return fromTop100().replace('a', '1').replace('z', '123');
    } else if (n < 40) {
        return fromTop100() + alphabet[randomInt(0, 9)] + alphabet[randomInt(10, 61)];
    } else {
        return alphabet[randomInt(0, 9)] + fromTop100K() + alphabet[randomInt(0, 9)] + alphabet[randomInt(0, 9)] + alphabet[randomInt(0, 9)];
    }
}

const generate = () => {
    let arr = [];
    const n = randomInt(0, 100);
    for (let i = 0; i < 100000; ++i) {
        if (n < 8) {
            arr.push(fromTop100());
        } else if (n < 11) {
            arr.push(reallyRandom());
        } else if (n < 81) {
            arr.push(fromTop100K());
        } else {
            arr.push(combined());
        }
    }
    return arr;
}

fs.writeFileSync("passwords100K.txt", generate().join('\n'));
