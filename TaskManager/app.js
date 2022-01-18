const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const task = require('./routes/task')
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorHandler')

//MIDDLEWARES
//PARSE REQUEST JSON MIDDLEWARE
app.use(express.json())

//ROUTES
app.use('/api/v1/tasks', task)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }   
}

start()