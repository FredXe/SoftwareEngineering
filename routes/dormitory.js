const express = require('express');
const router = express.Router();

const dormitoryCtrl = require('../controllers/dormitory');

router.use(express.urlencoded({ extended: false }));

router.get('/', dormitoryCtrl.showDorm);
router.post('/modify', dormitoryCtrl.modify);
router.post('/insert', dormitoryCtrl.insert);
module.exports = router;