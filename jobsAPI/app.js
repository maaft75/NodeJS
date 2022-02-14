require('dotenv').config()
const express = require('express')
const app = express()

require('express-async-errors')
const connect = require('./db/connect')
const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')
const verifyToken = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler')

//MIDDLEWARES & ROUTES
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', verifyToken, jobsRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
start = async() => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`We are live on PORT:${PORT}, baby!`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()