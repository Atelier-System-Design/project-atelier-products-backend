const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products')

let productSchema = mongoose.Shema({
  product_id: {type: String, index: {unique: true}},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [String],
  styles: [String],
  related_products: [Number]
});

let Product = mongoose.model('Product', productSchema);