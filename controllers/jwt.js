const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('Unable to generate token.');
            } else {
                resolve(token);
            }
        })
    })
};

module.exports = {
    generateToken
}