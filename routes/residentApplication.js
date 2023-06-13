const express = require('express');
const router = express.Router();
const residentApplicationCtrl = require('../controllers/residentApplication.js');

router.post('/apply', residentApplicationCtrl.postResidentApply);
router.get('/list', residentApplicationCtrl.getResidentApplyList);
router.get('/list_fee', residentApplicationCtrl.getApproveResidentFee);
router.get('/info', residentApplicationCtrl.getResidentApplyInfo);
router.post('/approve', residentApplicationCtrl.postResidentApprove);
router.post('/modify', residentApplicationCtrl.postResidentApplyModify);
router.post('/delete', residentApplicationCtrl.postResidentApplyDelete);

module.exports = router;