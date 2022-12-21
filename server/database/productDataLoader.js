const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const db = require('./db.js');

const productQueryText = 'INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)';

const featureQueryText = 'INSERT INTO features (id, product_id, feature, value) VALUES ($1, $2, $3, $4)';

const dataLoader = (queryText, csvName) => {
  let stream = fs.createReadStream(path.join(__dirname, `../../data/${csvName}.csv`));
  let csvData = [];
  let csvStream = csv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      csvData.shift();
      csvData.forEach((row) => {
        db.query(queryText, row)
          .then((result) => console.log(`inserted ${result.rowCount} row: ${row}`))
          .catch((error) => console.log(error));
      })
      console.log('done');
    });

  stream.pipe(csvStream);
}

dataLoader(productQueryText, 'product');
// dataLoader(featureQueryText, 'testFeatures');