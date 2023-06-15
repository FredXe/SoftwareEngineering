const express = require('express');
const router = express.Router();

const dormitoryCtrl = require('../controllers/dormitory');

router.use(express.urlencoded({ extended: false }));

router.get('/', dormitoryCtrl.showDorm);
router.post('/insert', dormitoryCtrl.insert);
router.post('/modify', dormitoryCtrl.modify);
router.get('/:dormName', dormitoryCtrl.showRoom);
router.post('/:dormName/insertRoom', dormitoryCtrl.insertRoom);
router.post('/:dormName/del', dormitoryCtrl.delRoom);
router.get('/:dormName/:rNumber', dormitoryCtrl.showEquip);
router.post('/:dormName/:rNumber/insertEuip', dormitoryCtrl.insertEquip);
router.post('/:dormName/:rNumber/del', dormitoryCtrl.delEquip);
module.exports = router;