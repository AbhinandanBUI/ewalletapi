const orderDb = require('./database/orderDb');


//create Product  
exports.createpeoduct = async (params) => {
    let createduser = await orderDb.create(params);
    if (createduser.userId != 0 && createduser.userId != null) {
        return createduser;
    } else {
        return 'unsuccessfull';
    }
};
 

exports.allProduct = async (params) => {
    let result = await orderDb.allProduct(params);
    if (result.length>0) {
        return result;
    } else {
        return 'no data';
    }
};
 

