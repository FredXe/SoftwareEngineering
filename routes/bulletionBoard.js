const express = require('express');
const router = express.Router();

const bulletionBoardCtrl = require('../controllers/bulletionBoard');



router.get('/', bulletionBoardCtrl.directList);
router.get('/', bulletionBoardCtrl.showBulletionTitles);
router.get('/*', bulletionBoardCtrl.showBulletionContent);
router.post('/addBulletion', bulletionBoardCtrl.addBulletion);
router.post('/*/addStuChat', bulletionBoardCtrl.addStuChat);
router.post('/*/addHouseChat', bulletionBoardCtrl.addHouseChat);
router.delete('/delBulletion', bulletionBoardCtrl.delBulletion);
router.delete('/*/delStuChat', bulletionBoardCtrl.delStuChat);
router.delete('/*/delHouseChat', bulletionBoardCtrl.delHouseChat);


module.exports = router;