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
		if (req.body.delete) {
			dormitory.delDorm(req.body.dormName);
		} else {
			await dormitory.modify(req.body.dormName, 'dorm_volume', req.body.dormVolum);
			await dormitory.modify(req.body.dormName, 'housemaster_ID', req.body.housemasterID);
		}
		res.redirect('/dormitory');
	},

	showRoom: async (req, res) => {
		const dormName = req.parm.dormName;
		const roomInfo = await dormitory.showRoom(dormName);
		res.renderInjected('dormitoryRooms', roomInfo);
	},

	insertRoom: async (req, res) => {
		const dormName = req.parm.dormName;
		await dormitory.insertRoom(dormName, req.body.roomVolume, req.body.roomCost);
		res.redirect('/dormitory/room');
	},

	delRoom: async (req, res) => {
		const dormName = req.parm.dormName;
		await dormitory.delRoom(dormName, req.body.roomNum);
		res.redirect('/dormitory/room');
	},

	showEquip: async (req, res) => {
		const dormName = req.parm.dormName;
		const rNumber = req.parm.rNumber;
		const equipInfo = await dormitory.showEquip(dormName, rNumber);
		res.renderInjected('dormitoryRoomsEquips', equipInfo);
	},

	insertEquip: async (req, res) => {
		const dormName = req.parm.dormName;
		const rNumber = req.parm.rNumber;
		await dormitory.insertEquipment(req.body.eType, req.body.eCondition, rNumber, dormName);
		res.redirect('/dormitory/room/equip');
	},

	delEquip: async (req, res) => {
		const dormName = req.parm.dormName;
		const rNumber = req.parm.rNumber;
		await dormitory.delEquip(req.body.eID, dormName, rNumber);
		res.redirect('/dormitory/room/equip');
	},


}

module.exports = public;