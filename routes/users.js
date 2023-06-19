const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const usersCtrl = require('../controllers/users');


router.get('/', usersCtrl.getRoot);
router.get('/show', usersCtrl.getShow);
router.get('/show/all', usersCtrl.getShowAll);
router.get('/show/detail/:user_ID', usersCtrl.getShowDetail);
router.post('/update', usersCtrl.postUpdate);
router.post('/insert', auth.auth('admin'), usersCtrl.postInsert);
router.post('/delete', usersCtrl.postDelete);

module.exports = router;