const userInfo = require('../models/userInfo');

const public = {

    // show resident student info (房號 , 住宿生)
    show: async (req , res) => {
        const userContent = await userInfo.show();
        res.render('userInfo' , {userContent}); // userInfo.ejs
    },

    // delete resident student(退宿)
    delete: (req , res) => {
        userInfo.delete(req.body.studentID);
        res.redirect('/userInfo');
    },
    
    directList: (req , res) => {
        res.redirect('/userInfo/list');
    }
}

module.exports = public;