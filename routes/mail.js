const express = require('express');
const router = express.Router();

const mail = require('../controllers/mail');

router.post('/forgotpassword', mail.postForgotPassword);
router.get('/forgotpassword', mail.getForgotPassword);
router.get('/changepassword', mail.getChangePassword);
module.exports = router;
