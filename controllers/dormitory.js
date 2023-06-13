const dormitory = require('../models/dormitory');

const public = {

    showDorm: async (req , res) => {
        const dormInfo = dormitory.showDorm();
        res.render('dormitory' , dormInfo);
    },

    modify: (req , res) => {
        dormitory.modify(req.body.dormName , req.body.updateAttribute , req.body.updateValue);
        res.redirect('/dormitory');
    },

    insert: (req , res) => {
        dormitory.insert(req.body.dormName , req.body.dormBolume , req.body.housemasterID);
        res.redirect('/dormitory');
    }
}

module.exports = public;