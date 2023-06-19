 // ! DELETE THIS WHOLE FILE WHEN MERGING
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.renderInjected('cssStepTest');
});

module.exports = router;