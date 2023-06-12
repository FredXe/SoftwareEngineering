const express = require('express');
const app = require('../app');
const dbAdmin = require('./dbAdmin');

app.use(express.static('public'));

app.use('/db', dbAdmin);

