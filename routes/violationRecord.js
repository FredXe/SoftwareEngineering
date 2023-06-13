const express = require('express');
const router = express.Router();
const violationRecordCtrl = require('../controllers/violationRecord');

router.post('/insert', violationRecordCtrl.postViolationInsert);
router.get('/list', violationRecordCtrl.getViolationList);
router.get('/info', violationRecordCtrl.getViolationInfo);
router.post('/delete', violationRecordCtrl.postViolationDelete);

module.exports = router;