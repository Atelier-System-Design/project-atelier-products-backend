const models = require('./models.js');

module.exports = {
  getAllProducts: (req, res) => {
   const page = req.query.page || 1;
   const count = req.query.count || 5;
    models.getAllProductsFromDB(page, count)
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(500).send(error));
  },
  getProduct: (req, res) => {
    models.getProductFromDB(req.params.product_id)
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(500).send(error))
  },
  getStyles: (req, res) => {
    models.getStylesFromDB(req.params.product_id)
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(500).send(error))
  },
  getRelated: (req, res) => {
    models.getRelatedFromDB(req.params.product_id)
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(500).send(error))
  }
};