const residentApplication = require('../models/residentApplication');

const public = {
    postResidentApply: (req, res) => {
        residentApplication.insertRA(req,body.rA_ID, 
            req,body.rA_semester, req,body.dorm_name, 
            req,body.rA_approve, req,body.rA_fee, 
            req,body.student_ID);
        res.redirect('residentApplication/Info');
    },

    getResidentApplyList: (req, res) => {
        const residentApplicationInfo = residentApplication.selectAllRA();
        res.render('residentApplicationInfo', {residentApplicationInfo});
    },

    getApproveResidentFee: (req, res) => {
        const residentFee = residentApplication.selectALLRAFee();
        res.render('residentFee', {residentFee});
    },

    getResidentApplyInfo: (req, res) => {
        const residentApplicationInfo = residentApplication.selectRA(req.body.rA_ID);
        res.render('residentApplicationInfo', {residentApplicationInfo});
    },

    postResidentApprove: (req, res) => {
        residentApplication.approveRA(req.body.rA_ID, req.body.dorm_name);
        res.redirect('residentApplication/list');
    },

    postResidentApplyModify: (req, res) => {
        residentApplication.modifyRA(req,body.rA_ID, 
            req,body.rA_semester, req,body.dorm_name, 
            req,body.rA_approve, req,body.rA_fee, 
            req,body.student_ID);
        res.redirect('residentApplication/Info');
    },

    postResidentApplyDelete: (req, res) => {
        residentApplication.deleteRA(req.body.rA_ID);
        res.redirect('residentApplication/');
    }

}

module.exports = public;