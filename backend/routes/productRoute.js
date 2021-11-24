const express = require('express')
const router = express.Router()
const product = require('../controller/productController')



router.route('/product').get(product.get).post(product.create).put().delete()

module.exports = router;