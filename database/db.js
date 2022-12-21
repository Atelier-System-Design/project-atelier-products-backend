const path = require('path');
require('dotenv').config({path: '../.env'});
const { Pool } = require('pg')

const pool = new Pool();

module.exports = {
  query: (text, params) => { return pool.query(text, params) }
}