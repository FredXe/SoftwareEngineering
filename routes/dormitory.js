const express = require('express');
const router = express.Router();

const dormitoryCtrl = require('../controllers/dormitory');

router.use(express.urlencoded({ extended: false }));

router.get('/', dormitoryCtrl.showDorm);
router.get('/room' , dormitoryCtrl.showRoom);
router.get('/room/equip' , dormitoryCtrl.showEquip);
router.post('/modify', dormitoryCtrl.modify);
router.post('/insert', dormitoryCtrl.insert);
router.post('/room/insertRoom' , dormitoryCtrl.insertRoom)
router.post('/room/equip/insertEuip' , dormitoryCtrl.insertEquip);
router.post('/room/del' , dormitoryCtrl.delRoom);
router.post('/room/equip/del' , dormitoryCtrl.delEquip);
module.exports = router;