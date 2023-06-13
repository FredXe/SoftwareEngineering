const express = require('express');
const app = require('../app');

const session = require('express-session');
const logger = require('../middlewares/logger');

const bulletionBoard = require('./bulletionBoard');
const dormitory = require('./dormitory');
const users = require('./users');
const myInfo = require('./myInfo');
const residentApplication = require('./residentApplication');
const userInfo = require('./userInfo');
const violationRecord = require('./violationRecord');
const visitor = require('./visitor');
const applyRepair = reuiqre('./apply_repair');

const dbAdmin = require('./dbAdmin');

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
// app.use(logger);
/**
 * setup static routers
 */
app.use(express.static('public'));
/**
 * setup routers
 */
app.use('/', users);
app.use('/bulletionBoard', bulletionBoard);
app.use('/dormitory', dormitory);
app.use('/myInfo', myInfo);
app.use('/applyRepair' , applyRepair);
// app.use('/residentApplication', residentApplication);
app.use('/userInfo', userInfo);
// app.use('/violationRecord', violationRecord);
// app.use('/visitor', visitor);
/**
 * routers for admin
 */
app.use('/db', dbAdmin);

