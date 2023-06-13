const dormitory = require('../models/dormitory');

const public = {

    showDorm: async (req , res) => {
        const dormInfo = await dormitory.show();
        console.log(dormInfo);
        res.render('dormitory' , dormInfo);
    },

    modify: (req , res) => {
        dormitory.modify(req.body.dormName , req.body.updateAttribute , req.body.updateValue);
        res.redirect('/dormitory');
    },

    insert: (req , res) => {
        dormitory.insert(req.body.dormName , req.body.dormVolume , req.body.housemasterID);
        // console.log(req.body);
        res.redirect('/dormitory');
    }
}

module.exports = public;