const express = require('express');
const bp = require('body-parser');
const compression = require('compression');
const { logging } = require('./middleware');

const app = express();

app.use(logging);
app.use(bp.json());
app.use(compression());

module.exports = app;
