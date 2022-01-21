require('dotenv').config()
const express = require('express')
const app = express()
const connect = require('./db/connect')
const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')

//ROUTES
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)

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