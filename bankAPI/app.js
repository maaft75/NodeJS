const express = require('express')
const app = express()
const { authorization } = require('./authorization')

//PARSES JSON REQUEST OBJECTS
/app.use(express.json());

//MIDDLEWARE
//app.use('/api', authorization)

//ROUTES
const accounts = require('./routes/accounts')

app.use('/api/account', accounts)

app.listen('3000', () => {
    console.log("We are up on port 3000, baby! ")
})