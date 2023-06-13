const express = require('express');
const router = express.Router();

const myInfoCtrl = require('../controllers/myInfo');

router.use(express.urlencoded({ extended: false }));

router.get('/' , myInfoCtrl.getInfo);

module.exports = router;