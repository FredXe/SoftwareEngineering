const express = require('express');
const router = express.Router();

const myInfoCtrl = require('../controllers/myInfo');

router.get('/' , myInfoCtrl.directInfo);

router.get('/info' , myInfoCtrl.show);

module.exports = router;