const express = require('express');
const app = require('../app');

const bulletionBoard = require('./bulletionBoard');
const dormitory = require('./dormitory');
const myInfo = require('./myInfo');
const residentApplication = require('./residentApplication');
const userInfo = require('./userInfo');
const violationRecord = require('./violationRecord');
const visitor = require('./visitor');

const dbAdmin = require('./dbAdmin');

/**
 * setup middleware
 */
app.use(express.urlencoded({ extended: false }));
/**
 * setup static routers
 */
app.use(express.static('public'));
/**
 * setup routers
 */
app.use('/bulletionBoard', bulletionBoard);
// app.use('/dormitory', dormitory);
// app.use('/myInfo', myInfo);
// app.use('/residentApplication', residentApplication);
// app.use('/userInfo', userInfo);
// app.use('/violationRecord', violationRecord);
// app.use('/visitor', visitor);
/**
 * routers for admin
 */
app.use('/db', dbAdmin);

