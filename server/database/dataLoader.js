const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const db = require('./db.js');

let stream = fs.createReadStream(path.join(path.join(__dirname, '../../data/testProducts.csv')));
let csvData = [];
let csvStream = csv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    csvData.shift();
    const queryText = `INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)`
    csvData.forEach((row) => {
      db.query(queryText, row)
      .then((result) => console.log(`inserted ${result.rowCount} row: ${row}`))
      .catch((error) => console.log(error))
    })
  });

  stream.pipe(csvStream);