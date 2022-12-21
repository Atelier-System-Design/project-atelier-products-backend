require('dotenv').config({path: '../../.env'});
const db = require('../../database/db.js')

db.query('SELECT * FROM features')
.then((result) => console.log(result))