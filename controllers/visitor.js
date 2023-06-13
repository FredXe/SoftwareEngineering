const visitor = require('../models/visitor');

const public = {
    postVisitApply: (req, res) => {
        visitor.insertVisitor(req.body.guest_ID, req.body.dorm_name, 
            req.body.visit_date, req.body.visit_approve);
        res.redirect('visitor/Info');
    },

    getVisitList: (req, res) => {
        const visitorInfo = visitor.selectAllVisitor();
        res.render('visitorInfo', {visitorInfo});
    },

    getVisitInfo: (req, res) => {
        const visitorInfo = visitor.selectVisitor(req.body.guest_ID);
        res.render('visitorInfo', {visitorInfo});
    },

    postVisitApprove: (req, res) => {
        visitor.approveVisit(req.body.guest_ID);
        res.redirect('visitor/list');
    },

    postVisitModify: (req, res) => {
        visitor.modifyVisitor(req.body.guest_ID, req.body.dorm_name, 
            req.body.visit_date, req.body.visit_approve);
        res.redirect('visitor/Info');
    },

    postVisitDelete: (req, res) => {
        visitor.deleteVisitor(req.body.guest_ID);
        res.redirect('visitor/');
    }

}

module.exports = public;