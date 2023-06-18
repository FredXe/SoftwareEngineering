const express = require('express');
const router = express.Router();
const residentApplicationCtrl = require('../controllers/residentApplication.js');

const auth = require('../middlewares/auth');

router.use(auth.auth('non_resident_student'));

router.get('/', residentApplicationCtrl.getRoot); // 跳轉到學生或管理員頁面
router.get('/list', residentApplicationCtrl.getResidentApplyList); // 管理員列出所有申請

// TODO
router.get('/info', residentApplicationCtrl.getResidentApplyInfo);

router.post('/apply', residentApplicationCtrl.postResidentApply);
router.post('/delete', residentApplicationCtrl.postResidentApplyDelete);
router.post('/studentDelete', residentApplicationCtrl.postResidentApplyStudentDelete);
router.post('/modify', residentApplicationCtrl.postResidentApplyModify);
router.get('/studentInfo', residentApplicationCtrl.getResidentApplyStudent);
router.post('/approve', residentApplicationCtrl.postResidentApprove);



module.exports = router;