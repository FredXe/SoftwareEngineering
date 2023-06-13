const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const dbAdminCtrl = require('../controllers/dbAdmin');

router.use(auth.auth('admin'));

router.get('/', dbAdminCtrl.getDbAdmin);
router.post('/drop', dbAdminCtrl.postDrop);
router.post('/init', dbAdminCtrl.postInit);
router.post('/reset', dbAdminCtrl.postReset);
router.post('/import', dbAdminCtrl.postImport);
router.post('/selectUser', dbAdminCtrl.postSelectUser);

module.exports = router;