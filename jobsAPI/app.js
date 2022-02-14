require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()


const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const connect = require('./db/connect')
const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')
const rateLimit = require('express-rate-limit')
const verifyToken = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler')

//SECURITY PACKAGES
app.set('trust proxy', 1)
app.use(
    rateLimit({
        windowsMs: 2 * 60 * 1000,   //2 MINUTES
        max: 10                     //10 REQUESTS PER WINDOWMS FOR AN IP
    })
)
app.use(xss())
app.use(cors())
app.use(helmet())


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