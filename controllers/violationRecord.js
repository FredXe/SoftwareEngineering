const violation = require('../models/violationRecord');

const public = {
    //新增違規
    postViolationInsert: async (req, res) => {
        violation.insertVR(req.body.vr_date, req.body.vr_type, 
            req.body.resident_ID, req.body.housemaster_ID);
        res.redirect('/violation/list');
    },

    //刪除違規紀錄
    postViolationDelete: async (req, res) => {
        violation.deleteVR(req.body.vr_ID);
        res.redirect('/violation/list');
    },

    //修改違規紀錄
    postViolationModify: async (req, res) => {
        violation.modifyVR(req.body.vr_ID, req.body.vr_date, req.body.vr_type);
        res.redirect('/violation/list');
    },

    //查看某住宿生違規紀錄
    getViolationResident: async (req, res) => {
        const violationResident = await violation.selectResidentVR(req.body.resident_ID);
        res.renderInjected('violationRecord', {violationResident});
    },

    //查看所有違規紀錄
    getViolationList: async (req, res) => {
        const violationInfos = await violation.selectAllVR();
        res.renderInjected('violationRecord', {violationInfos});
    },

    //查看某項違規紀錄
    getViolationInfo: async (req, res) => {
        const violationInfo = await violation.selectVR(req.body.vr_ID);
        res.renderInjected('violationRecord', {violationInfo});
    },

    

}

module.exports = public;