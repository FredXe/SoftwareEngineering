const myInfo = require('../models/myInfo');

const public = {
    getInfo: async (req , res) => {
        const info = await myInfo.show();
        res.renderInjected('myInfo' , info);
        // res.send(info);
    }
}

module.exports = public;