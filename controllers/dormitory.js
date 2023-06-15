const dormitory = require('../models/dormitory');

const public = {

	showDorm: async (req, res) => {
		const dormInfo = await dormitory.show();
		res.renderInjected('dormitory', {
			dormInfo,
		});
	},

	insert: async (req, res) => {
		await dormitory.insert(req.body.dormName, req.body.dormVolume, req.body.housemasterID);
		res.redirect('/dormitory');
	},

	modify: async (req, res) => {
		console.log(req.body);

		if (req.body.delete) {
			console.log('dormitory deleted');
		} else {
			console.log(':D', req.body.dormName, req.body.dormVolum);
			await dormitory.modify(req.body.dormName, 'dorm_volume', req.body.dormVolum);
			await dormitory.modify(req.body.dormName, 'housemaster_ID', req.body.housemasterName);
		}
		res.redirect('/dormitory');
	},

	showRoom: async (req, res) => {
		const roomInfo = await dormitory.showRoom(req.body.dormName);
		console.log(roomInfo);
		res.renderInjected('dormitory', roomInfo);
	},

	insertRoom: async (req, res) => {
		await dormitory.insertRoom(req.body.dormName, req.body.roomVolume, req.body.roomCost);
		res.redirect('/dormitory/room');
	},

	delRoom: async (req, res) => {
		await dormitory.delRoom(req.body.dormName, req.body.roomNum);
		res.redirect('/dormitory/room');
	},

	showEquip: async (req, res) => {
		const equipInfo = await dormitory.showEquip(req.body.dormName, req.body.roomNum);
		console.log(roomInfo);
		res.renderInjected('dormitory', equipInfo);
	},

	insertEquip: async (req, res) => {
		await dormitory.insertEquipment(req.body.eType, req.body.eCondition, req.body.roomNum, req.body.dormName);
		res.redirect('/dormitory/room/equip');
	},

	delEquip: async (req, res) => {
		await dormitory.delEquip(req.body.eID, req.body.dormName, req.body.roomNum);
		res.redirect('/dormitory/room/equip');
	},


}

module.exports = public;