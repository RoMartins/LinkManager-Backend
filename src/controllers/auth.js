const express = require('express');

const router = express.Router();

const {Account} = require('../models')
const {hashSync , compareSync} = require('bcrypt')

const {accountSignUp, accountSignIn} = require('../validators/account')
const {getMessage} = require('../helpers/messages')
const {generateJwt, verifyJwt, verifyRefreshJwt, generateRefreshJwt} = require('../helpers/jwt');

router.post('/sign-in', accountSignIn, async (req, res) =>{

    const {email , password} = req.body;
    const account = await Account.findOne({where : {email}});

    const match = account ? compareSync(password, account.password) : null
    if(!match) return res.jsonBadRequest(null, getMessage('account.signIn.invalid'))
    
    const token = generateJwt({id : account.id })
    const Refreshtoken = generateRefreshJwt({id :account.id, version : account.jwtVersion })

    return res.jsonOK(account, getMessage('account.signIn.success'), {token, Refreshtoken})
})


router.post('/sign-up', accountSignUp ,async (req, res) => {
    
    const {email , password} = req.body;

    const EmailExists = await Account.findOne({where : {email}});
    if(EmailExists) return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));
    
    const hashPassword = hashSync(password, 10)
    const NewAccount = await Account.create({email , password: hashPassword})

    const token = generateJwt({id : NewAccount.id })
    const Refreshtoken = generateRefreshJwt({id : NewAccount.id,  version : NewAccount.jwtVersion})

    return res.jsonOK(NewAccount,  getMessage('account.signup.success'), {token, Refreshtoken})
}) 

module.exports = router