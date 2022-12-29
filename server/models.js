const db = require('./database/db.js');

module.exports = {
  getAllProductsFromDB: (page, count) => {
    return db.query(`SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${(page * count) - count}`)
      .then((result) => {
        return result.rows;
      })
      .catch((error) => {
        return error;
      })
  },
  getProductFromDB: (product_id) => {
    return db.query(`SELECT *, (SELECT json_agg(features) FROM (SELECT feature, value FROM features WHERE product_id=${product_id}) features) AS features FROM products WHERE id=${product_id}`)
      .then((result) => {
        return result.rows[0];
      })
      .catch((error) => {
        return error;
      })
  },
  getStylesFromDB: (product_id) => {
    return db.query(`SELECT id as product_id,
    (SELECT json_agg(response) AS results FROM (SELECT id as style_id, name, original_price, sale_price, default_style AS "default?",
    (SELECT json_agg(photos) AS photos FROM (SELECT thumbnail_url, url FROM photos WHERE style_id = styles.id) photos),
    (SELECT json_object_agg(id, (json_build_object('quantity', quantity, 'size', size))) AS skus FROM skus WHERE style_id=styles.id)
    FROM styles WHERE product_id=${product_id}) response)
    FROM products WHERE id=${product_id}`)
      .then((result) => {
        return result.rows[0];
      })
      .catch((error) => {
        return error;
      })
  },
  getRelatedFromDB: (product_id) => {
    return db.query(`SELECT related_product_id FROM related WHERE current_product_id=${product_id}`)
      .then((result) => {
        return result.rows.map((related) => {
          return related.related_product_id;
        });
      })
      .catch((error) => {
        return error;
      })
  }
};