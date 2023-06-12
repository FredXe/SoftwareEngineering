const express = require('express');
const app = require('../app');
const foo = require('./foo');

app.use(express.static('public'));

app.use('/', foo);

