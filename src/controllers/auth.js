const express = require('express');

const router = express.Router();

const {Account} = require('../models')
const {hashSync} = require('bcrypt')

const {accountSignUp} = require('../validators/account')
const {getMessage} = require('../helpers/messages')


router.post('/sign-up', accountSignUp ,async (req, res) => {
    
    const {email , password} = req.body;


    const EmailExists = await Account.findOne({where : {email}});
    
    if(EmailExists) return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));
    
    const hashPassword = hashSync(password, 10)
    const NewAccount = await Account.create({email , password: hashPassword})
    
    return res.jsonOK(NewAccount, getMessage('account.signup.success'))
}) 

module.exports = router