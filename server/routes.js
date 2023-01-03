const express = require("express");
const router = express.Router();
const controllers = require('./controllers.js');

router.get('/products', controllers.getAllProducts)
router.get('/products/:product_id', controllers.getProduct)
router.get('/products/:product_id/styles', controllers.getStyles)
router.get('/products/:product_id/related', controllers.getRelated)
router.get(`/${process.env.LTOKEN}`, (req, res) => {
  res.send(`${process.env.LTOKEN}`);
});

module.exports = router;