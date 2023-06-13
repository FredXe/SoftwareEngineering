const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');


router.get('/', usersCtrl.getRoot);
router.get('/show', usersCtrl.getUserShow);
router.post('/admin/insert', usersCtrl.postAdminInsert);
router.post('/housemaster/insert', usersCtrl.postHousemasterInsert);
router.post('/resident_student');
router.post('/non_resident_student');
router.post('/maintainer');
router.post('/visitor');

module.exports = router;