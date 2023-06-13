const residentApplication = require('../models/residentApplication');

const public = {
    postResidentApply: async (req, res) => {
        residentApplication.insertRA(req,body.rA_ID, 
            req,body.rA_semester, req,body.dorm_name, 
            req,body.rA_approve, req,body.rA_fee, 
            req,body.student_ID);
        res.redirect('residentApplication/Info');
    },

    getResidentApplyList: async (req, res) => {
        const residentApplicationInfo = await residentApplication.selectAllRA();
        res.render('residentApplicationInfo', {residentApplicationInfo});
    },

    getApproveResidentFee: async (req, res) => {
        const residentFee = await residentApplication.selectALLRAFee();
        res.render('residentFee', {residentFee});
    },

    getResidentApplyInfo: async (req, res) => {
        const residentApplicationInfo = await residentApplication.selectRA(req.body.rA_ID);
        res.render('residentApplicationInfo', {residentApplicationInfo});
    },

    postResidentApprove: async (req, res) => {
        residentApplication.approveRA(req.body.rA_ID, req.body.dorm_name);
        res.redirect('residentApplication/list');
    },

    postResidentApplyModify: async (req, res) => {
        residentApplication.modifyRA(req,body.rA_ID, 
            req,body.rA_semester, req,body.dorm_name, 
            req,body.rA_approve, req,body.rA_fee, 
            req,body.student_ID);
        res.redirect('residentApplication/Info');
    },

    postResidentApplyDelete: async (req, res) => {
        residentApplication.deleteRA(req.body.rA_ID);
        res.redirect('residentApplication/');
    }

}

module.exports = public;