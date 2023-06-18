const violation = require('../models/violationRecord');

const public = {
    //新增違規
    postViolationInsert: async (req, res) => {
        await violation.insertVR(req.body.vr_type, req.body.resident_ID, req.session.user_ID);
        res.redirect('/violationRecord/list');
    },

    //修改或刪除違規紀錄
    postViolationModify: async (req, res) => {
        if (req.body.delete) {
            await violation.deleteVR(req.body.vr_ID);
		} else {
            await violation.modifyVR(req.body.vr_ID, req.body.vr_type);
		}
        res.redirect('/violationRecord/list');
    },

    //查看某住宿生違規紀錄
    getViolationResident: async (req, res) => {
        const violationResident = await violation.selectResidentVR(req.params.user_ID);
        console.log(violationResident);
        res.renderInjected('violationRecord', {
            violationInfos: violationResident
        });
    },

    //查看所有違規紀錄
    getViolationList: async (req, res) => {
        if(req.session.role == 'resident_student'){
            res.redirect(`/violationRecord/${req.session.user_ID}`);
        }
        violationInfos = await violation.selectAllVR();
        if(req.session.role == 'housemaster'){
            violationInfos = violationInfos.filter(element => element.housemaster_ID == req.session.user_ID);
        }
        res.renderInjected('violationRecord', {violationInfos});
    },

    //查看某項違規紀錄
    getViolationInfo: async (req, res) => {
        const violationInfo = await violation.selectVR(req.body.vr_ID);
        res.renderInjected('violationRecord', {violationInfo});
    },

    

}

module.exports = public;