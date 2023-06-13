const express = require('express');
const router = express.Router();

const userInfoCtrl = require('../controllers/userInfo');

router.get('/' , userInfoCtrl.directList);

// 也許會有身分驗證 : 權限舍監以上才可以看到該網頁
// show resident student info (房號 , 住宿生)
router.get('/list' , userInfoCtrl.show);

// delete resident student(退宿)
router.post('/delResiStu' , userInfoCtrl.delete);

module.exports = router;