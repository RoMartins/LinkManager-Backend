const express = require('express');

const router = express.Router();

router.get('/sign-in', (req, res) => {
    return res.json('sign')
}) 

module.exports = router