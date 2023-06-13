const express = require('express');
const router = express.Router();

const bulletionBoardCtrl = require('../controllers/bulletionBoard');

router.get('/', bulletionBoardCtrl.showBulletionTitles);
router.get('/*', bulletionBoardCtrl.showBulletionContent);
router.post('/post', bulletionBoardCtrl.postPost);
router.post('/*/comment', bulletionBoardCtrl.comment);
router.post('/*/comment/delete', bulletionBoardCtrl.delComment);
router.post('/delete', bulletionBoardCtrl.delBulletion);


module.exports = router;