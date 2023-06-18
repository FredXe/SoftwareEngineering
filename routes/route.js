const express = require('express');
const app = require('../app');

const session = require('express-session');
const dataInjector = require('../middlewares/dataInjector');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');

const bulletionBoard = require('./bulletionBoard');
const dormitory = require('./dormitory');
const root = require('./root');
const users = require('./users');
const mail = require('./mail');
const myInfo = require('./myInfo');
const residentApplication = require('./residentApplication');
const userInfo = require('./userInfo');
const violationRecord = require('./violationRecord');
const visitor = require('./visitor');
const applyRepair = require('./applyRepair');

const dbAdmin = require('./dbAdmin');
const cssTest = require('./cssTest'); // ! DELETE ME WHEN MERGING

/**
 * setup static routers
*/
app.use(express.static('public'));
/**
 * setup middleware
 */
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SECRET,
	name: 'user',
	saveUninitialized: false,
	resave: true,
	cookie:
	{
		maxAge: 30 * 60 * 1000 // 30 min
	}
}));
app.use(logger);
app.use(dataInjector);
app.use('/', root);
app.use('/mail', mail);
app.use(auth.auth('guest'));
/**
 * setup routers
*/
app.use('/users', users);
app.use('/bulletion', bulletionBoard);
app.use('/dormitory', dormitory);
app.use('/myInfo', myInfo);
app.use('/applyRepair', applyRepair);
app.use('/residentApplication', residentApplication);
app.use('/userInfo', userInfo);
app.use('/violationRecord', violationRecord);
app.use('/visitor', visitor);
/**
 * routers for admin
 */
app.use('/db', dbAdmin);
app.use('/css', cssTest);

