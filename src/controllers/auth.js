const express = require('express');
const {Account} = require('../models')
const {hashSync} = require('bcrypt')

const router = express.Router();

router.get('/sign-in', async (req, res) => {
    
    const {email , password} = req.body;


    const EmailExists = await Account.findOne({where : {email}});
    
    if(EmailExists) return res.jsonBadRequest(null, 'Account already exists');
    
    const hashPassword = hashSync(password, 10)
    const NewAccount = await Account.create({email , password: hashPassword})
    
    return res.jsonOK(NewAccount, "Account created")
}) 

module.exports = router