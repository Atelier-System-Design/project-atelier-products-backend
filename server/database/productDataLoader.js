const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const db = require('./db.js');
const copyFrom = require('pg-copy-streams').from;

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
          .catch((error) => console.log(error));
      })
      console.log('done');
    });

  stream.pipe(csvStream);
}

// dataLoader(productQueryText, 'testProducts');
// dataLoader(featureQueryText, 'testFeatures');
db.connect()
  .then((client) => {
    const stream = client.query(copyFrom('COPY products FROM STDIN CSV HEADER'))
    const fileStream = fs.createReadStream(path.join(__dirname, `../../data/product.csv`))
    fileStream.on('error', client.release)
    stream.on('error', client.release)
    stream.on('finish', client.release)
    fileStream.pipe(stream)
  })