require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')
const productsJson = require('./products.json')

start = async() => {
	try{
		await connectDB(process.env.MONGO_URI)
		await Product.deleteMany()
		await Product.create(productsJson)
		console.log("Products created!")
		process.exit(0)
	}
	catch(error){
		console.log(error)
		process.exit(1)
	}
}

start()
