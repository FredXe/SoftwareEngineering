const violation = require('../models/violationRecord');

const public = {
    postViolationInsert: (req, res) => {
        violation.insertVR(req.body.vr_ID, 
            req.body.vr_date, req.body.vr_type, 
            req.body.resident_ID, req.body.housemaster_ID);
        res.redirect('violation/list');
    },

    getViolationList: (req, res) => {
        const visitorInfo = violation.selectAllVR();
        res.render('visitorInfo', {visitorInfo});
    },

    getViolationInfo: (req, res) => {
        const violationInfo = violation.selectVR(req.body.vr_ID);
        res.render('violationInfo', {violationInfo});
    },

    postViolationDelete: (req, res) => {
        violation.deleteVR(req.body.vr_ID);
        res.redirect('violation/list');
    }

}

module.exports = public;