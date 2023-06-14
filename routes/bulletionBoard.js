const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const bulletionBoardCtrl = require('../controllers/bulletionBoard');

router.use(auth.auth('non_resident_student'));

router.get('/', bulletionBoardCtrl.bulletionDump);
// router.get('/:bb_ID', bulletionBoardCtrl.showBulletionContent);
router.post('/post', bulletionBoardCtrl.postPost);
router.post('/:bb_ID/comment', bulletionBoardCtrl.comment);
router.post('/:bb_ID/comment/delete', bulletionBoardCtrl.delComment);
router.post('/delete', bulletionBoardCtrl.delBulletion);


module.exports = router;