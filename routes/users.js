const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');


router.get('/', usersCtrl.getRoot);
router.get('/show', usersCtrl.getShow);
router.get('/show/all', usersCtrl.getShowAll);
router.get('/show/detail/:user_ID', usersCtrl.getShowDetail);
router.post('/update', usersCtrl.postUpdate);
router.post('/insert', usersCtrl.postInsert);



router.post('/admin/insert', usersCtrl.postAdminInsert);
router.post('/housemaster/insert', usersCtrl.postHousemasterInsert);
router.post('/nonResidentStudent/insert', usersCtrl.postNonResidentStudentInsert);
router.post('/maintainer/insert', usersCtrl.postMaintainerInsert);

module.exports = router;