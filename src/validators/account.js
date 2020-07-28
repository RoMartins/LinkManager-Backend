const Joi = require('@hapi/joi')
const {getValidatorError} = require('../helpers/validator')

const options = {abortEarly : false}

const rules = {
    email : Joi.string().email().required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
    password_confirmation : Joi.string().valid(Joi.ref('password')).required()

}

const accountSignUp = (req, res, next) => {
    const { email , password, password_confirmation} = req.body;
    
    const schema = Joi.object({
        email : rules.email,
        password : rules.password,
        password_confirmation : rules.password_confirmation
        
    })

    const {error} = schema.validate({email, password, password_confirmation}, options)
    
    if(error) {
        const errorMessage = getValidatorError(error, "account.signup");

        return res.jsonBadRequest(null ,null , {error : errorMessage})
    }

    next();
}

const accountSignIn = (req, res, next) => {
    const { email , password} = req.body;
    
    const schema = Joi.object({
        email : rules.email,
        password : rules.password,
        
    })

    const {error} = schema.validate({email, password}, options)
    
    if(error) {
        const errorMessage = getValidatorError(error, "account.signIn");

        return res.jsonBadRequest(null ,null , {error : errorMessage})
    }

    next();
}


module.exports = {accountSignUp, accountSignIn};