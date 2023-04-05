const loan_trans = require("../../model/loan_trans.model");
const mLoan_account = require("../../model/mloan_account.model");

exports.create = async (data) => {
  try {
    const product = await new loan_trans(data).save();
    if (product.userId >= 1) {
      return "success";
    } else {
      return "error";
    }
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};

//update master loan table
exports.UpdateMLoan = async (data) => {
  try {
    const amounts = await this.TotalTypeAmount(data);
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
     
    const mdata = {
      totalReceiveAmount:TotalReceive,
      totalSendAmount:TotalSend,
      amount: data.amount,
      todate:data.todate,
      totalPayAmount:TotalSend-TotalReceive
    };
    const result = await mLoan_account.findOneAndUpdate(
      { userId: data.userId, loanerId: data.loanerId },
      { $set: mdata }
    );

    return result;
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};
exports.ViewLoanTransition = async (data) => {
  try {
    const result = await loan_trans.find({
      userId: data.userId,
      loanerId: data.loanerId,
    });
    return result;
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};

exports.allloan_trans = async (Id) => {
  try {
    const result = await loan_trans.find({ userId: Id });
    return result;
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};
//genereate id

exports.generateId = async () => {
  try {
    const result = await loan_trans.find();
    return result.length;
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};

exports.MgenerateId = async () => {
  try {
    const result = await mLoan_account.find();
    return result.length;
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};

///creating loan account
exports.createAccount = async (data) => {
  try {
    const product = await new mLoan_account(data).save();
    if (product.userId >= 1) {
      return "success";
    } else {
      return "error";
    }
  } catch (e) {
    throw new Error("Unable to create admin: " + e.message);
  }
};
//get loan account
exports.GetLoanAccount = async (Id) => {
  try {
    const result = await mLoan_account.find({ userId: Id });
    if (result.length >= 1) {
      return result;
    } else {
      return "error";
    }
  } catch (e) {
    throw new Error("Unable to find  accounts: " + e.message);
  }
};
//
exports.verifyLoanAccount = async (data) => {
  try {
    const result = await mLoan_account.find({
      userId: data.userId,
      loanerId: data.loanerId,
      loanerName: data.lonaerName,
    });
    if (result.length == 0) {
      return "not found";
    } else {
      return "found account";
    }
  } catch (e) {
    throw new Error("Unable to find  account: " + e.message);
  }
};

//sum the amount
exports.TotalAmount = async (data) => {
  try {
    const result = await loan_trans.aggregate([
      {
        $match: {
          userId: { $in: [data.userId] },
          loanerId: { $in: [data.loanerId] },
        },
      },
      { $group: { _id: "$loanerId", total: { $sum: "$amount" } } },
    ]);
    if (result.length != 0) {
      console.log("total amount = " + result);
      return result;
    } else {
      return result;
    }
  } catch (e) {
    throw new Error("Unable to find  account: " + e.message);
  }
};

exports.TotalTypeAmount = async (data) => {
  try {
    const resultSend = await loan_trans.aggregate([
      {
        $match: {
          userId: { $in: [data.userId] },
          loanerId: { $in: [data.loanerId] },
          transitionType: { $in: ['1'] }
        },
      },
      { $group: { _id: "$loanerId", total: { $sum: "$amount" } } },
    ]);
    const resultReceive = await loan_trans.aggregate([
      {
        $match: {
          userId: { $in: [data.userId] },
          loanerId: { $in: [data.loanerId] },
          transitionType: { $in: ['0'] }
        },
      },
      { $group: { _id: "$loanerId", total: { $sum: "$amount" } } },
    ]);
   
    const model ={
      TotalReceive :resultReceive,
      TotalSend:resultSend
    }

   

    return model


   
  } catch (e) {
    throw new Error("Unable to find  account: " + e.message);
  }
};
