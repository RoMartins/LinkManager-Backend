const message = require('../config/messages.json');

const getMessage = (path) => {
    return message[path] || null
}

module.exports = {getMessage}