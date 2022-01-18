require('dotenv').config()

//SETTING UP EXPRESS SERVER
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

//ROUTES
const Product = require('./route/product')


//MIDDLEWARES
app.use(express.json())
app.use('/api/v1/product/', Product)
app.use(notFound)
//app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
	try{
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => {console.log(`Server is listening on ${port}`)})
	}
	catch(error){
		console.log(error)
	}
} 

start()
