const jwt = require('jsonwebtoken');

// function that takes in user and return a token
const createJwtToken = user => {
    return jwt.sign({ user }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = { createJwtToken }