const express = require("express");
const router = express.Router();
const controllers = require('./controllers.js');

router.get('/products', controllers.getAllProducts)
router.get('/products/:product_id', controllers.getProduct)
router.get('/products/:product_id/styles', controllers.getStyles)
router.get('/products/:product_id/related', controllers.getRelated)

module.exports = router;