const express = require('express');
const router = express.Router();

const bulletionBoardCtrl = require('../controllers/bulletionBoard');

router.get('/', bulletionBoardCtrl.showBulletionTitles);
router.get('/*', bulletionBoardCtrl.showBulletionContent);
router.post('/post', bulletionBoardCtrl.postPost);
router.post('/*/comment', bulletionBoardCtrl.comment);
router.post('/delete', bulletionBoardCtrl.delBulletion);
router.post('/*/delStuChat', bulletionBoardCtrl.delStuChat);
router.post('/*/delHouseChat', bulletionBoardCtrl.delHouseChat);


module.exports = router;