require('dotenv').config();


const jwt = require('jsonwebtoken')

const tokenPrivateKey = process.env.JWT_TOKEN_KEY
const tokenRefreshPrivateKey = process.env.JWT_REFRESH_TOKEN_KEY
const options = { expiresIn : '30 minutes' };
const Refreshoptions = { expiresIn : '30 days' };

const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey ,options)
}

const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, tokenRefreshPrivateKey ,Refreshoptions)
}

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey)
};

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, tokenRefreshPrivateKey)
};
module.exports = {generateJwt, verifyJwt, verifyRefreshJwt, generateRefreshJwt}