const productDb = require('./database/productDb');
const commonservice = require('./common.service');




//create Product  
exports.createpeoduct = async (params) => {
    // console.log("this is my paramerters", params);
    const date = await commonservice.getDate();
    params.dop = date;
    let createduser = await productDb.create(params);
 
    if (createduser.userId != 0 && createduser.userId != null) {

        return createduser;
    } else {
        return 'unsuccessfull';
    }
    
};
//create Master Product  
exports.createMpeoduct = async (params) => {
    
    const amount = await productDb.TotalAmount(params);
    params.amount = amount[0].total;
    let transType = await productDb.findMproduct(params.userId,params.dop);
    if (transType == 'update') {
        let createduser = await productDb.updateM_product(params);
        if (createduser.modifiedCount == 1) {
            return 'success';
        } else {
            return 'unsuccessfull';
        }
    }else{
        let createduser = await productDb.createM_product(params);
        if (createduser.userId != 0 && createduser.userId != null) {

            return 'success';
        } else {
            return 'unsuccessfull';
        }
    }
    // console.log("user created :?" + createduser,params.userId)
    
    
};

//get product

exports.allProduct = async (params) => {
    // console.log("this is my paramerters", params);
    let result = await productDb.allProduct(params);
    // console.log("user created :?" + createduser,params.userId)
    if (result.length>0) {
        return result;
    } else {
        return 'no data';
    }
};
exports.filterproduct = async (params) => {
    // console.log("this is my paramerters", params);
    let result = await productDb.filterproduct(params);
    // console.log("user created :?" + createduser,params.userId)
    if (result.length>0) {
        return result;
    } else {
        return 'no data';
    }
};

