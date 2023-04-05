const loan_transervice = require('../services/loan_trans.service');
const commonservice = require('../services/common.service');
const os = require('os');
const IP = require('ip');


const loan_transController = {};

//create new transition
loan_transController.addloan_trans = async (req, res) => {
    try {
        const data = req.body;
        let xloanId = await loan_transervice.generateId();
        data.loanId = xloanId;
        const result = await loan_transervice.create(data);
        if (result == 'success') {
            const result =  await loan_transervice.UpdadeAmount(data);
            let model = {
                message: result,
                success: true,
                responseData: 'record created successfully'

            }
            res.send(model)
        } else {
            let model = {
                message: result,
                success: false,
                responseData: 'something wrong '
            }
            res.send(model)
        }

    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}
//end
//create new transition
loan_transController.createAccount = async (req, res) => {
    try {


        const data = req.body;
        const isAccount = await loan_transervice.VerifyLoanAccount(data);
        if (isAccount =='not found') {
            let xloanId = await loan_transervice.MgenerateId();
            data.loanId = xloanId;
            const curdate = await commonservice.getDate();
            data.fromDate = curdate;
            data.toDate = curdate;
            const result = await loan_transervice.createAccount(data);
            if (result == 'success') {
                let model = {
                    message: result,
                    success: true,
                    responseData: 'record created successfully'
    
                }
                res.send(model)
            } else {
                let model = {
                    message: result,
                    success: false,
                    responseData: 'something wrong '
                }
                res.send(model)
            }
        } else {
            let model = {
                message: 'account already exit',
                success: false,
                responseData: 'account exists'
            }
            res.send(model)
        }
     

    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}
//end
//by user id
loan_transController.ByUserId = async (req, res) => {
    let Id = req.body.userId;
    const result = await loan_transervice.allloan_trans(Id);
    if (result.length >= 1) {
        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }

}
//end
loan_transController.getIpAddress = async (req, res) => {

    const address = await os.networkInterfaces();

    res.send({
        message: 'success',
        success: true,
        responseData: address
    })

}
//get loan account
loan_transController.GetLoanAccount = async (req, res) => {
    let Id = req.body.userId;
    const result = await loan_transervice.GetLoanAccount(Id);
    if (result.length >= 1) {
        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }


     

}

loan_transController.UpdatedAmount = async (req,res)=>{
    let data = req.body;
   
    const result =  await loan_transervice.UpdadeAmount(data);
    if (result != null) {
    
        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }

}
loan_transController.ViewLoanTransition = async (req,res)=>{
    let data = req.body;
    const result =  await loan_transervice.ViewLoanTransition(data);
    if (result != null) {
    
        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }

}


module.exports = loan_transController