const { resolve } = require('path');
const db = require('./db');
const fs = require('fs/promises');

const public = {
    // 顯示大樓資訊
    show: async function () {
        const rows = await db.query('select dorm_name , dorm_volume , user_name as housemaster_name from dormitory , users where dormitory.housemaster_ID = users.user_ID;')
        const content = JSON.parse(JSON.stringify(rows));

        return new Promise(resolve => {
			resolve(content);
		});
    },

    
    update: async function (dorm_name , want_update_attribute , update_value) {
        if(want_update_attribute = "dorm_name"){
            db.query(`update dormitory set dorm_name = ${update_value} from dormitory where dorm_name = ${dorm_name};`);
        }else if(want_update_attribute = "dorm_volume"){
            db.query(`update dormitory set dorm_volume = ${update_value} from dormitory where dorm_name = ${dorm_name};`);
        }else if(want_update_attribute = "housemaster_ID"){
            db.query(`update dormitory set housemaster_ID = ${update_value} from dormitory where dorm_name = ${dorm_name};`)
        }

        return new Promise(resolve => {
            resolve('大樓資訊更新完畢');
        });

        
    },

    apply_repair: async function (dorm_name , room_num , equipment_ID) {
        db.query(`update equipment set e_condition = 0 from equipment where ${dorm_name} = equipment.dorm_name and ${room_num} = equipment.r_number and ${equipment_ID} = equipment.e_ID;`);
        return new Promise(resolve => {
            resolve('申請維修成功!');
        });
    },

    show_apply_repair: async function () {
        const rows = await db.query('select dorm_name , r_number , e_type , e_ID from equipment where e_condition = 0;');
        const content = JSON.parse(JSON.stringify(rows));

        return new Promise(resolve => {
			resolve(content);
		});
    },

    finish_repair: async function (dorm_name , room_num , equipment_ID) {
        db.query(`update equipment set e_condition = 1 from equipment where ${dorm_name} = equipment.dorm_name and ${room_num} = equipment.r_number and ${equipment_ID} = equipment.e_ID;`);
        return new Promise(resolve => {
            resolve('維修完畢!');
        });
    }
}

module.exports = public;