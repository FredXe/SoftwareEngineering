const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');


router.get('/', usersCtrl.getRoot);
// router.get('/show', usersCtrl.getUserShow);
router.get('/admin/show', usersCtrl.getAdminShow);
router.post('/admin/insert', usersCtrl.postAdminInsert);
router.get('/housemaster/show', usersCtrl.getHousemasterShow);
router.post('/housemaster/insert', usersCtrl.postHousemasterInsert);
router.get('/nonResidentStudent/show', usersCtrl.getNonResidentStudentShow);
router.post('/nonResidentStudent/insert', usersCtrl.postNonResidentStudentInsert);
router.get('/maintainer/show', usersCtrl.getMaintainerShow);
router.post('/maintainer/insert', usersCtrl.postMaintainer);

module.exports = router;