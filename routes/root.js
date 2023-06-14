const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/root');

router.get('/login', usersCtrl.getLogin);
router.post('/login', usersCtrl.postLogin);
router.post('/logout', usersCtrl.postLogout);

module.exports = router;