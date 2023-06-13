const myInfo = require('../models/myInfo');

const public = {
    // show your own infomation
    show: async (req , res) => {
        //! 是否可以這樣宣告變數
        const {ownInfo , residentInfo}= await myInfo.show(); 
        res.render('myInfo' , {ownInfo , residentInfo});
    },

    directInfo: (req , res) => {
        res.redirect('/myInfo/info');
    }
}

module.exports = public;