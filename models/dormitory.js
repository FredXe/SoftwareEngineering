const { resolve } = require('path');
const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');

const public = {
    // 顯示大樓資訊
    show: async function () {
        const rows = await db.query('select dorm_name , dorm_volume , user_name as housemaster_name ' +
            'from dormitory , users where dormitory.housemaster_ID = users.user_ID;')
        const content = utils.decodeRows(rows);

        return new Promise(resolve => {
            resolve(content);
        });
    },


    modify: async function (dorm_name, want_update_attribute, update_value) {
        const quote = (want_update_attribute != "dorm_volume") ? "\'" :"";
        const query = `update dormitory set ${want_update_attribute} = ${quote + update_value + quote} where dorm_name = '${dorm_name}';`;

        try {
            await db.query(query);
        } catch (err) {
            console.error(err);
        }

    },

    insert: async function (dormName, dormVolume, housemasterID) {
        const query = `insert into dormitory (dorm_name , dorm_volume , housemaster_ID) ` + 
                        `values ( '${dormName}' , ${dormVolume} , '${housemasterID}');`;

        try {
            await db.query(query);
        } catch (err) {
            console.error(err);
        }
    },

    applyRepair: async function (dorm_name, room_num, equipment_ID) {
        const query = `update equipment set e_condition = 0 from equipment ` +
            `where equipment.dorm_name = ${dorm_name} and equipment.r_number = ${room_num} and equipment.e_ID = ${equipment_ID};`;

        try {
            await db.query(query);
        } catch (err) {
            console.error(err);
        }
    },

    showApplyRepair: async function () {
        const rows = await db.query('select dorm_name , r_number , e_type , e_ID from equipment where e_condition = 0;');
        const content = utils.decodeRows(rows);

        return new Promise(resolve => {
            resolve(content);
        });
    },

    finishRepair: async function (dorm_name, room_num, equipment_ID) {
        const query = `update equipment set e_condition = 1 from equipment ` +
            `where equipment.dorm_name = ${dorm_name} and equipment.r_number = ${room_num} and equipment.e_ID = ${equipment_ID};`;
        try {
            await db.query(query);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = public;