const express = require('express');
const router = express.Router();

const dbAdminCtrl = require('../controllers/dbAdmin');

router.get('/', dbAdminCtrl.getDbAdmin);
router.post('/drop', dbAdminCtrl.postDrop);
router.post('/init', dbAdminCtrl.postInit);
router.post('/reset', dbAdminCtrl.postReset);
router.post('/import', dbAdminCtrl.postImport);
router.post('/selectUser', dbAdminCtrl.postSelectUser);

module.exports = router;