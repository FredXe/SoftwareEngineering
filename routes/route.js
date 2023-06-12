const express = require('express');
const app = require('../app');

const bulletionBoard = ('./bulletionBoard');
const dormitory = ('./dormitory');
const myInfo = ('./myInfo');
const residentApplication = ('./residentApplication');
const userInfo = ('./userInfo');
const violationRecord = ('./violationRecord');
const visitor = ('./visitor');

const dbAdmin = require('./dbAdmin');

/**
 * setup static routers
 */
app.use(express.static('public'));
/**
 * setup routers
 */
// app.use('/bulletionBoard', bulletionBoard);
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

