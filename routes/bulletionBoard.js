const express = require('express');
const router = express.Router();

const bulletionBoardCtrl = require('../controllers/bulletionBoard');



router.get('/', bulletionBoardCtrl.getBulletionBoard);
router.post('/', bulletionBoardCtrl.postBulletionBoard);
router.post('/delete');
router.get('/comment', bulletionBoardCtrl.getComment);
router.post('/comment', bulletionBoardCtrl.postComment);
router.post('/comment/delete', bulletionBoardCtrl.postDelComment);


module.exports = router;