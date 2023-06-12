const express = require('express');
const router = express.Router();

const tables = require('../models/tables');

router.get('/', function (req, res) {
	res.render('foo');
});

router.post('/drop', function (req, res) {
	tables.drop();
	res.redirect('/db');
});

router.post('/init', function (req, res) {
	tables.init();
	res.redirect('/db');
});

router.post('/reset', function (req, res) {
	tables.reset();
	res.redirect('/db');
});

router.post('/import', function (req, res) {
	tables.import();
	res.redirect('/db');
});

router.post('/selectUser', function (req, res) {
	tables.selectUser();
	res.redirect('/db');
});



module.exports = router;