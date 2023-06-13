const express = require('express');
const router = express.Router();
const visitorCtrl = require('../controllers/visitor.js');

router.post('/apply', visitorCtrl.postVisitApply);
router.get('/list', visitorCtrl.getVisitList);
router.get('/info', visitorCtrl.getVisitInfo);
router.post('/approve', visitorCtrl.postVisitApprove);
router.post('/modify', visitorCtrl.postVisitModify);
router.post('/delete', visitorCtrl.postVisitDelete);

module.exports = router;