const express = require('express');
const router = express.Router();

const applyRepairCtrl = require('../controllers/apply_repair');

router.use(express.urlencoded({ extended: false }));

router.get('/' , applyRepairCtrl.getApplyRepair);
router.get('/list' , applyRepairCtrl.showApplyRepair);
router.post('/apply' , applyRepairCtrl.applyRepair);
router.post('/finishApply' , )
module.exports = router;