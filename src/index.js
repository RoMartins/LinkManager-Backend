const express = require('express')
const response = require('./middlewares/response')

const db = require('./models')
const checkJwt = require('./middlewares/jwt')
const authController = require("./controllers/auth")
const linkController = require("./controllers/link")

const app = express();

app.use(response);
app.use(checkJwt);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/auth', authController)
app.use('/link', linkController)

db.sequelize.sync().then(() => {
    app.listen(3003 , () => {
        console.log('Listening on port 3001')
    });
});
