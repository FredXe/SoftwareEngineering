const express = require('express');
const router = express.Router();
const violationRecordCtrl = require('../controllers/violationRecord');

router.get('/', violationRecordCtrl.getViolationList);
router.post('/insert', violationRecordCtrl.postViolationInsert); //新增違規
router.post('/modify', violationRecordCtrl.postViolationModify); //修改或刪除違規紀錄
router.get('/list', violationRecordCtrl.getViolationList); //查看所有違規紀錄
router.get('/info', violationRecordCtrl.getViolationInfo); //查看某項違規紀錄
router.get('/:user_ID', violationRecordCtrl.getViolationResident); //查看某住宿生違規紀錄


module.exports = router;