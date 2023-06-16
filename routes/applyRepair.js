const express = require('express');
const router = express.Router();

const applyRepairCtrl = require('../controllers/applyRepair');

router.use(express.urlencoded({ extended: false }));

router.get('/', applyRepairCtrl.getApplyRepair);
router.get('/maintainerList', applyRepairCtrl.showApplyRepair);
router.get('/residentList', applyRepairCtrl.showResidentEquip)
router.post('/apply', applyRepairCtrl.applyRepair);
router.post('/finishApply', applyRepairCtrl.finishRepair);
module.exports = router;