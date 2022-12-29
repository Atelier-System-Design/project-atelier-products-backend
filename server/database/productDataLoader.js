const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const db = require('./db.js');
const copyFrom = require('pg-copy-streams').from;

const loadDataByRow = (queryText, csvName) => {
  let stream = fs.createReadStream(path.join(__dirname, `../../data/${csvName}.csv`));
  let csvData = [];
  let csvStream = csv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      csvData.shift();
      for (let i = 0; i < csvData.length; i++) {
        db.query(queryText, csvData[i])
      };
    });

  stream.pipe(csvStream);
}

const copyFromCSV = (tablename, csvName, nullValues) => {
  return new Promise((resolve, reject) => {
    db.connect()
    .then((client) => {
      const stream = client.query(copyFrom(`COPY ${tablename} FROM STDIN CSV HEADER NULL as '${nullValues}'`))
      const fileStream = fs.createReadStream(path.join(__dirname, `../../data/${csvName}.csv`))
      fileStream.on('error', (error) => {
        console.log(error);
        client.release();
      })
      stream.on('error', (error) => {
        console.log(error);
        client.release();
      })
      stream.on('finish', () => {
        console.log(`done copying ${tablename}` );
        client.release();
      })
      fileStream.pipe(stream)
        .on('finish', resolve)
        .on('error', reject)
    })
  })
};

const loadDatabase = () => {
  copyFromCSV('products', 'product', 'null')
    .then(() => {
      return copyFromCSV('features', 'features', 'null');
    })
    .then(() => {
      return copyFromCSV('styles', 'styles', 'null');
    })
    .then(() => {
      return copyFromCSV('photos', 'photos', 'null');
    })
    .then(() => {
      return copyFromCSV('skus', 'skus', 'null');
    })
    .then(() => {
      return copyFromCSV('related', 'related', '0');
    })
    .then(() => {
      console.log('Finished loading database');
    })
    .catch((error) => console.log(error));
};

// loadDatabase();
copyFromCSV('related', 'related', '0');