require('dotenv').config()
const express = require('express')
const app = express()
const connect = require('./db/connect')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')

//ROUTES
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

//MIDDLEWARES
app.use(express.json())

//REGISTER ROUTES
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/product', productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

start = async() => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(PORT, () => { console.log(`Server is listening on PORT:${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}

start()