const violation = require('../models/violationRecord');

const public = {
    postViolationInsert: async (req, res) => {
        violation.insertVR(req.body.vr_ID, 
            req.body.vr_date, req.body.vr_type, 
            req.body.resident_ID, req.body.housemaster_ID);
        res.redirect('violation/list');
    },

    getViolationList: async (req, res) => {
        const violationInfos = await violation.selectAllVR();
        res.renderInjected('violationRecord', {violationInfos});
    },

    getViolationInfo: async (req, res) => {
        const violationInfo = await violation.selectVR(req.body.vr_ID);
        res.renderInjected('violationRecord', {violationInfo});
    },

    postViolationDelete: async (req, res) => {
        violation.deleteVR(req.body.vr_ID);
        res.redirect('violation/list');
    }

}

module.exports = public;