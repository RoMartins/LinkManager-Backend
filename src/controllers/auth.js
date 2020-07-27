const express = require('express');
const {Account} = require('../models')
const {hashSync} = require('bcrypt')

const router = express.Router();
const SaltRounds = 10;

router.get('/sign-in', async (req, res) => {
    
    const email = 'rodrigomartins@hotmail.com'
    const password = '123456'

    const hashPassword = hashSync(password, 10)

    const results = await Account.create({email , password: hashPassword})
    
    return res.json(results)
}) 

module.exports = router