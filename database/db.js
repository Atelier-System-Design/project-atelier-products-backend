const path = require('path');
require('dotenv').config({path: '../.env'});
const { Client } = require('pg')
const client = new Client({});

client.connect();