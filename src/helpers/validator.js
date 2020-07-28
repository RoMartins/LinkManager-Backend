
const {getMessage} = require("./messages")


const getValidatorError = (error, MessagePath) => {
    if(!error) return null; 

    const errorMessage = {}
    error.details.map( detail => {
        const message = detail.message
        const type = detail.type
        const key = detail.context.key
        const path = `${MessagePath}.${key}.${type}`
        
        const customMessage =  getMessage(path) ;
        if(!customMessage) {
            console.log('CustomMessage not found for path', path)
        }

        errorMessage[key] = customMessage || message;

    })
    return errorMessage
}

module.exports = {getValidatorError, getMessage}