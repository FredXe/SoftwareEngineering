const express = require('express');
const router = express.Router();
const residentApplicationCtrl = require('../controllers/residentApplication.js');

router.get('/', residentApplicationCtrl.getResidentApplyList);
router.post('/apply', residentApplicationCtrl.postResidentApply);
router.post('/delete', residentApplicationCtrl.postResidentApplyDelete);
router.post('/studentDelete', residentApplicationCtrl.postResidentApplyStudentDelete);
router.post('/modify', residentApplicationCtrl.postResidentApplyModify);
router.get('/list', residentApplicationCtrl.getResidentApplyList);
router.get('/listFee', residentApplicationCtrl.getApproveResidentFee);
router.get('/info', residentApplicationCtrl.getResidentApplyInfo);
router.get('/studentInfo', residentApplicationCtrl.getResidentApplyStudent);
router.post('/approve', residentApplicationCtrl.postResidentApprove);



module.exports = router;