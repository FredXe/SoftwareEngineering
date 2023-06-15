const express = require('express');
const router = express.Router();
const violationRecordCtrl = require('../controllers/violationRecord');

router.get('/', violationRecordCtrl.getViolationList);
router.post('/insert', violationRecordCtrl.postViolationInsert);
router.post('/delete', violationRecordCtrl.postViolationDelete);
router.post('/modify', violationRecordCtrl.postViolationModify);
router.get('/list', violationRecordCtrl.getViolationList);
router.get('/info', violationRecordCtrl.getViolationInfo);
router.get('/residentInfo', violationRecordCtrl.getViolationResident);


module.exports = router;