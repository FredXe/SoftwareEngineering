const express = require('express');
const router = express.Router();

const bulletionBoardCtrl = require('../controllers/bulletionBoard');

router.use(express.urlencoded({ extended: false }));

router.post('/comment', bulletionBoardCtrl.postComment);


module.exports = router;