const express = require('express');
const router = express.Router();
const residentApplicationCtrl = require('../controllers/residentApplication.js');

const auth = require('../middlewares/auth');

router.use(auth.auth('non_resident_student'));

router.get('/', residentApplicationCtrl.getRoot); // 跳轉到學生或管理員頁面
/**
 * admin
 */
router.get('/list', auth.auth('admin'), residentApplicationCtrl.getResidentApplicationList); // 列出所有申請
router.get('/list/:student_ID', auth.auth('admin'), residentApplicationCtrl.getResidentApplicationApprove); // 點進一個申請
router.post('/approve', auth.auth('admin'), residentApplicationCtrl.postResidentApprove); // 核可申請
router.post('/delete', residentApplicationCtrl.postResidentApplicationDelete); // 刪除申請

// TODO
router.get('/info', residentApplicationCtrl.getResidentApplicationInfo);

router.post('/apply', residentApplicationCtrl.postResidentApplicationApply);
router.post('/pay', residentApplicationCtrl.postPayTheFee);



module.exports = router;