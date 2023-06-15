const dormitory = require('../models/dormitory');

const public = {

	showDorm: async (req, res) => {
		const dormInfo = await dormitory.show();
		console.log(dormInfo);
		res.renderInjected('dormitory', {
			dormInfo,
		});
	},

	showRoom: async (req, res) => {
		const roomInfo = await dormitory.showRoom(req.body.dormName);
		console.log(roomInfo);
		res.renderInjected('dormitory', roomInfo);
	},

	showEquip: async (req, res) => {
		const equipInfo = await dormitory.showEquip(req.body.dormName, req.body.roomNum);
		console.log(roomInfo);
		res.renderInjected('dormitory', equipInfo);
	},

	modify: async (req, res) => {
		await dormitory.modify(req.body.dormName, req.body.updateAttribute, req.body.updateValue);
		res.redirect('/dormitory');
	},

	insert: async (req, res) => {
		await dormitory.insert(req.body.dormName, req.body.dormVolume, req.body.housemasterID);
		// console.log(req.body);
		res.redirect('/dormitory');
	},

	insertRoom: async (req, res) => {
		await dormitory.insertRoom(req.body.dormName, req.body.roomVolume, req.body.roomCost);
		res.redirect('/dormitory/room');
	},

	insertEquip: async (req, res) => {
		await dormitory.insertEquipment(req.body.eType, req.body.eCondition, req.body.roomNum, req.body.dormName);
		res.redirect('/dormitory/room/equip');
	},

	delRoom: async (req, res) => {
		await dormitory.delRoom(req.body.dormName, req.body.roomNum);
		res.redirect('/dormitory/room');
	},

	delEquip: async (req, res) => {
		await dormitory.delEquip(req.body.eID, req.body.dormName, req.body.roomNum);
		res.redirect('/dormitory/room/equip');
	},


}

module.exports = public;