const laon_transDb = require('./database/loan_transDb');
const commonservice = require('./common.service');

//create user  
exports.create = async (params) => {
    const loan_transData = ({
        userId: params.userId,
        loanId: params.loanId,
        loanerId: params.loanerId,
        transitionType: params.transitionType,
        description: params.description,
        status: params.status,
        amount: params.amount,
        createdBy: params.createdBy,
        payFrom: params.userId,
        isActive: 1,
        isDelete: 0,
    })
    let result = await laon_transDb.create(loan_transData);
    if (result == 'success') {
        return result;
    } else {
        return result;
    }
};

//auto update amount and date 
exports.UpdadeAmount = async(data) =>{
    const amountt = await laon_transDb.TotalTypeAmount(data);

    let amount = await laon_transDb.TotalAmount(data);
    data.amount = parseInt(amount[0].total);
    const todate = await commonservice.getDate();
    data.todate = todate;
    let result = await laon_transDb.UpdateMLoan(data);
    if (result != null) {
        return 'updated';
    } else {
        return 'err';
    }
}
exports.ViewLoanTransition = async(data) =>{
    let result = await laon_transDb.ViewLoanTransition(data);
    if (result != null) {
        return result;
    } else {
        return 'err';
    }
}
//auto update amount and date 


//creating account
exports.createAccount = async (params) => {
     
    const amounts = await  laon_transDb.TotalTypeAmount(params);
    console.log(amounts);
    if (amounts.TotalReceive.length ==0) {
      TotalReceive  = 0;
    } else {
      TotalReceive = amounts.TotalReceive[0].total;
    }
    if (amounts.TotalSend.length ==0) {
      TotalSend = 0;
    } else {
      TotalSend = amounts.TotalSend[0].total;
    }
    const loan_transData = ({
        userId: params.userId,
        loanId: params.loanId,
        loanerId: params.loanerId,
        loanerName: params.lonaerName,
        status: params.status,
        amount: params.amount,
        createdBy: params.userId,
        fromdate: params.fromDate,
        toDate: params.toDate,
        totalSendAmount: TotalSend,
        totalPayAmount: TotalSend,
        totalReceiveAmount: TotalReceive,
        isActive: 1,
        isDelete: 0,
    })

    let result = await laon_transDb.createAccount(loan_transData);
    if (result == 'success') {
        return result;
    } else {
        return result;
    }

};

//get product

exports.allloan_trans = async (params) => {
    let result = await laon_transDb.allloan_trans(params);
    if (result.length > 0) {
        // removing 0 balance
        return result;
    } else {
        return 'no data';
    }
};

//

exports.generateId = async () => {
    let result = await laon_transDb.generateId();
    if (result>=0) {
        console.log('generated id  is -',result)
        return result+1;
    } else {
        return 'error';
    }
};
exports.MgenerateId = async () => {
    let result = await laon_transDb.MgenerateId();
    if (result>=0) {
        console.log('generated id  is -',result)
        return result+1;
    } else {
        return 'error';
    }
};
//get loan account
exports.GetLoanAccount = async (Id) => {
    let result = await laon_transDb.GetLoanAccount(Id);
    if (result.length >= 1) {
        return result;
    } else {
        return 'error';
    }
};
exports.VerifyLoanAccount = async (data) => {
    let result = await laon_transDb.verifyLoanAccount(data);
    if (result == 'not found') {
        return result;
    } else {
        return result;
    }
};