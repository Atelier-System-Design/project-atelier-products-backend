const db = require('./database/db.js');

module.exports = {
  getAllProductsFromDB: (queryParams) => {
    return db.query(`SELECT * FROM products LIMIT ${queryParams.count}`)
      .then((result) => {
        return result.rows;
      })
      .catch((error) => {
        return error;
      })
  },
  getProductFromDB: (product_id) => {
    let response;
    return db.query(`SELECT * FROM products WHERE id=${product_id}`)
      .then((result) => {
        response = result.rows[0];
        return db.query(`SELECT feature, value FROM features WHERE product_id=${product_id}`)
      })
      .then((result) => {
        response.features = result.rows;
        return response;
      })
      .catch((error) => {
        return error;
      })
  },
  getStylesFromDB: (product_id) => {
    let response = {
      product_id
    };
    return db.query(`SELECT id as style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id=${product_id}`)
      .then((result) => {
        return new Promise ((resolve, reject) => {
          response['results'] = result.rows
          Promise.all(response.results.map((style) => {
            return db.query(`SELECT thumbnail_url, url FROM photos WHERE style_id=${style.style_id}`)
              .then(result => {
                return result.rows
              })
          }))
            .then((photosArray) => {
              for (let i = 0; i < response.results.length; i++) {
                response.results[i]['photos'] = photosArray[i]
              }
              resolve(response);
            })
            .catch((error) => reject(error));
        })
      })
      .then(() => {
        return new Promise ((resolve, reject) => {
          Promise.all(response.results.map((style) => {
            return db.query(`SELECT id, quantity, size FROM skus WHERE style_id=${style.style_id}`)
              .then((result) => {
                return result.rows
              })
          }))
          .then((skuArray) => {
            for (let i = 0; i < response.results.length; i++) {
              response.results[i]['skus'] = {}
              for (let j = 0; j < skuArray.length; j++) {
                let quantSize = {
                  quantity: skuArray[i][j].quantity,
                  size: skuArray[i][j].size
                }
                response.results[i].skus[skuArray[i][j].id] = quantSize;
              }
            }
            resolve(response);
          })
          .catch((error) => reject(error));
        })
      })
      .catch((error) => {
        return (error);
      });
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