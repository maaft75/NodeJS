const express = require('express')
const router = express.Router()
const getAllProducts = require('../controllers/product')
const authMiddleware = require('../middlewares/auth')

router.route('/').get(authMiddleware ,getAllProducts)

module.exports = router