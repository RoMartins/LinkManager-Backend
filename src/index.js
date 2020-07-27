const express = require('express')
const authController = require("./controllers/auth")
const app = express();

app.use('/auth', authController)

app.listen(3333 , () => {
    console.log('Listening on port 3001')
});