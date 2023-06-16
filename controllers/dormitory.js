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
			await dormitory.modify(req.body.dormName, 'dorm_volume', req.body.dormVolume);
			await dormitory.modify(req.body.dormName, 'housemaster_ID', req.body.housemasterID);
		}
		res.redirect('/dormitory');
	},

	showRoom: async (req, res) => {
		const dormName = req.params.dormName;
		const roomInfo = await dormitory.showRoom(dormName);
		res.renderInjected('dormitoryRooms',{
			roomInfo,
			dormName,
		});
	},

	insertRoom: async (req, res) => {
		const dormName = req.params.dormName;
		await dormitory.insertRoom(dormName, req.body.roomVolume, req.body.roomCost);
		res.redirect(`/dormitory/${req.params.dormName}`);
	},

	delRoom: async (req, res) => {
		const dormName = req.params.dormName;
		console.log(req.params.dormName, req.body.roomNum);
		await dormitory.delRoom(dormName, req.body.roomNum);
		res.redirect(`/dormitory/${dormName}`);
	},

	showEquip: async (req, res) => {
		const dormName = req.params.dormName;
		const roomNum = req.params.rNumber;
		const equipInfo = await dormitory.showEquip(dormName, roomNum);
		res.renderInjected('dormitoryRoomsEquips',{
			dormName,
			roomNum,
			equipInfo,
		});
	},

	insertEquip: async (req, res) => {
		const dormName = req.params.dormName;
		const rNumber = req.params.rNumber;
		await dormitory.insertEquipment(dormName, rNumber, req.body.eType, req.body.eCondition);
		res.redirect(`/dormitory/${dormName}/${rNumber}`);
	},

	delEquip: async (req, res) => {
		const dormName = req.params.dormName;
		const rNumber = req.params.rNumber;
		await dormitory.delEquip(dormName, rNumber, req.body.eID);
		res.redirect(`/dormitory/${dormName}/${rNumber}`);
	},


}

module.exports = public;