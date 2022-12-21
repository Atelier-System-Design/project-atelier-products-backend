require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

app.use(morgan());
app.use(express.json());

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on localhost:${process.env.PORT}`);
  }
});