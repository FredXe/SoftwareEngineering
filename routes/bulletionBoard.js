const express = require('express');
const router = express.Router();

const bulletionBoardCtrl = require('../controllers/bulletionBoard');

router.get('/', bulletionBoardCtrl.showBulletionTitles);
router.get('/:bb_ID', bulletionBoardCtrl.showBulletionContent);
router.post('/post', bulletionBoardCtrl.postPost);
router.post('/:bb_ID/comment', bulletionBoardCtrl.comment);
router.post('/:bb_ID/comment/delete', bulletionBoardCtrl.delComment);
router.post('/delete', bulletionBoardCtrl.delBulletion);


module.exports = router;