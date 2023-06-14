const visitor = require('../models/visitor');

const public = {
    postVisitApply: async (req, res) => {
        visitor.insertVisitor(req.body.guest_ID, req.body.dorm_name, 
            req.body.visit_date, req.body.visit_approve);
        res.redirect('/visitor/Info');
    },

    getVisitList: async (req, res) => {
        const visitorInfos = await visitor.selectAllVisitor();
        res.renderInjected('visitor', {visitorInfos});
    },

    getVisitInfo: async (req, res) => {
        const visitorInfo = await visitor.selectVisitor(req.body.guest_ID);
        res.renderInjected('visitor', {visitorInfo});

    },

    

    postVisitApprove: async (req, res) => {
        visitor.approveVisit(req.body.guest_ID);
        res.redirect('/visitor/list');
    },

    postVisitModify: async (req, res) => {
        visitor.modifyVisitor(req.body.guest_ID, req.body.dorm_name, 
            req.body.visit_date, req.body.visit_approve);
        res.redirect('/visitor/Info');
    },

    postVisitDelete: async (req, res) => {
        visitor.deleteVisitor(req.body.guest_ID);
        res.redirect('/visitor/list');
    }

}

module.exports = public;