const dashmodel = require('../../model/dashboard.model');
const commonservice = require('../common.service');
const productTrans = require('../../model/product.model');




//activate dashbord
exports.activateDashboard = async (data) => {
    try {
        const date = await commonservice.getDate();
        data.dateOfCreated = date;
     
        let dashData = ({
            Id: data.dashId,
            userId: data.userId,
            totalProductDaily: data.totalProductDaily,
            totalProductMonth: data.totalProductMonth,
            totalProductYearly: data.totalProductYearly,
            totalAmount: data.totalAmount,
            amount: data.amount,
            status: data.status,
            dateOfCreated: date,
            createdBy: data.userId,
            isActive: 1,
            isDelete: 0,
        })

        let result = await dashmodel(dashData).save();
        return result
    } catch (e) {
        throw new Error('Unable create dashboard: ' + e.message)
    }
};

//checkdashboard is activated
exports.checkDashboard = async (userid) => {
    try {
        let result = await dashmodel.findOne({ userId: userid });
        if (result == null) {
            return 0
        }else{
            return result
        }
    } catch (e) {
        throw new Error('Unable to check dashboard: ' + e.message)
    }
};
//get  dashboard
exports.GetDashboard = async (userid) => {
    try {
        let result = await dashmodel.findOne({ userId: userid });
        return result
    } catch (e) {
        throw new Error('Unable to get dashboard: ' + e.message)
    }
};

exports.generateId = async () => {
    try {
        const result = await dashmodel.find();
        return result.length + 1;
    } catch (e) {
        throw new Error('Unable to create admin: ' + e.message)
    }
}
exports.UpdateAmount = async (data) => {
    try {
        const mdata ={
            totalProductDaily:data.damount,
            totalProductMonth:data.mamount,
            totalProductYearly:data.yamount,
        }
        const result = await dashmodel.findOneAndUpdate({userId:data.userId},{$set:mdata});
        
        return result;
    } catch (e) {
        throw new Error('Unable to Update amount: ' + e.message)
    }
}


//sum the amount 
