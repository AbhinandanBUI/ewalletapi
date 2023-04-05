const tproduct = require("../../model/product.model");
const mproduct = require("../../model/m_product.model");
const datenow = require("../common.service");
const loandb = require("../../model/loan_trans.model");
const loandbAccount = require("../../model/mloan_account.model");

exports.create = async (data) => {
  try {
    let date_ob = new Date();
    let productData = {
      userId: data.userId,
      productName_Id: data.productName_Id,
      dop: data.dop,
      amount: data.amount,
      monthId: ("0" + (date_ob.getMonth() + 1)).slice(-2),
      payFrom: data.payFrom,
      dateId: ("0" + date_ob.getDate()).slice(-2),
      isActive: 1,
      isDelete: 0,
    };
    const product = await new tproduct(productData).save();

    return product;
  } catch (e) {
    throw new Error("Unable to create Product: " + e.message);
  }
};
//chart insert data

//get all product
exports.allProduct = async (data) => {
  try {
    const date = await datenow.getDate();
    // console.log(date);
    const result = await tproduct.find({ userId: data, dop: date });
    return result;
  } catch (e) {
    throw new Error("Unable to  Product: " + e.message);
  }
};
//get all product
// exports.filterproduct = async (data) => {
//   try {
//     const date = await datenow.getDate();
//     // console.log(date);
    
//     const result = await tproduct.find({
//       userId: data.userId,
//       monthId: data.month,
//     });
//     return result;
//   } catch (e) {
//     throw new Error("Unable to create filter: " + e.message);
//   }
// };
exports.filterproduct = async (data) => {
  try {
    const date = await datenow.getDate();
    console.log(data);
    const result = await tproduct.find({
      userId: data.userId,
      monthId: data.month,
      
    // $year: "$dop" : data.year
    });
   const  result2 = await tproduct.aggregate([
      {$addFields: {  "month" : {$month: '$dop'}}},{$addFields: {  "year" : {$year: '$dop'}}},
      {$match: { month: data.month, year: data.year,userId:data.userId}}]);
    console.log("this is result here",result,result2)
    return result2;
  } catch (e) {
    throw new Error("Unable to create filter: " + e.message);
  }
};

// insert data in master per day

exports.findMproduct = async (id, date) => {
  try {
    const result = await mproduct.find({ userId: id, dop: date });
    if (result.length == 0) {
      return "create";
    } else {
      return "update";
    }
  } catch (e) {
    console.log("unable to find Product:" + e.message);
  }
};

exports.updateM_product = async (data) => {
  try {
    const result = await mproduct.updateOne(
      { userId: data.userId, dop: data.dop },
      {
        $set: { amount: data.amount },
        $currentDate: { lastModified: true },
      }
    );
    return result;
  } catch (e) {
    console.log("unable to update M Product:" + e.message);
  }
};

exports.createM_product = async (data) => {
  try {
    let MproductData = {
      userId: data.userId,
      dop: data.dop,
      amount: data.amount,
      monthId: data.monthId,
      dateId: data.dateId,
      isActive: 1,
      isDelete: 0,
    };
    const result = await mproduct(MproductData).save();
    return result;
  } catch (error) {
    console.log("unable to create product:" + e.message);
  }
};

// #Total Amount
exports.TotalAmount = async (data) => {
  try {
    console.log(data);
    const result = await tproduct.aggregate([
      { $match: { userId: { $in: [data.userId] }, dop: { $in: [data.dop] } } },
      { $group: { _id: "$loanerId", total: { $sum: "$amount" } } },
    ]);
    if (result.length != 0) {
      console.log("total amount = " + result);
      return result;
    } else {
      return result;
    }
  } catch (e) {
    throw new Error("Unable to find  Total Amount: " + e.message);
  }
};

exports.DashboardUpdateTotalAmount = async (data) => {
  try {
    //dailybases
    const daily = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" },date: { $dayOfMonth: "$dop" }}},
      {$match: {userId: { $in: [data.userId] },"date":data.date,"month":data.monthId,"year":data.year}},
      { $group: { _id: data.date, total: { $sum: "$amount" } } },
    ]);
//by month
    const month = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" },date: { $dayOfMonth: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "month":data.monthId,"year":data.year}},
      { $group: { _id: data.monthId, total: { $sum: "$amount" } } },
    ]);
    //yearly
    const yearly = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" },date: { $dayOfMonth: "$dop" }}},
      { $match : { userId: { $in: [data.userId] },  "year":data.year} },
      { $group: { _id:data.year, total: { $sum: "$amount" } } }
      
    ]);
    //back year 
    // const yearly2 = await tproduct.aggregate([
    //     { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
    //     month: { $month: "$dop" },date: { $dayOfMonth: "$dop" }}},
    //     { $match : { userId: { $in: [data.userId] },  "year":2021} },
    //     { $group: { _id:   2021, total: { $sum: "$amount" } } }
    //   ]);
  const sendLoan = await loandb.aggregate([
    {$match: {userId: { $in: [data.userId] },transitionType: { $in: ["1"] }}},
    { $group: { _id: "$isActive", total: { $sum: "$amount" } } },
  ]);    
  const receiveLoan = await loandb.aggregate([
    {$match: {userId: { $in: [data.userId] },transitionType: { $in: ["0"] }}},
    { $group: { _id: "$isActive", total: { $sum: "$amount" } } },
  ]);
 
 

    const result = {
      DailyAmount: daily,
      MonthlyAmount: month,
      YearlyAmount: yearly,
      // YearlyAmount2: yearly2,
      LoanSend: sendLoan,
      ReceiveLoan: receiveLoan,
      
    };
    return result;
  } catch (e) {
    console.log("this is error" + e.message);
    throw new Error("Unable to find  Total Amount: " + e.message);
  }
};

exports.WeeklyStats = async (data) => {
  try {
    console.log("this is week data",data);
   const w1 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":1} },
    { $group: { _id: 1, total: { $sum: "$amount" } } }
  ]);
  const w2 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":2} },
    { $group: { _id: 2, total: { $sum: "$amount" } } }
  ]);
  const w3 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":3} },
    { $group: { _id: 3, total: { $sum: "$amount" } } }
  ]);
  const w4 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":4} },
    { $group: { _id: 4, total: { $sum: "$amount" } } }
  ]);
  const w5 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":5} },
    { $group: { _id: 5, total: { $sum: "$amount" } } }
  ]);
  const w6 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":6} },
    { $group: { _id: 6, total: { $sum: "$amount" } } }
  ]);
  const w7 = await tproduct.aggregate([
    { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" }, dayofweek:{ $dayOfWeek:  "$dop"  },
    week: { $week: "$dop" }}},
    { $match : { userId: { $in: [data.userId] },  "year":data.year,"week":data.weekId,"dayofweek":7} },
    { $group: { _id: 7, total: { $sum: "$amount" } } }
  ]);


    const result = {
      wd1:w1,
      wd2:w2,
      wd3:w3,
      wd4:w4,
      wd5:w5,
      wd6:w6,
      wd7:w7   
    };
    return result;
  } catch (e) {
    console.log("this is error" + e.message);
    throw new Error("Unable to find  Total Amount: " + e.message);
  }
};
exports.monthlyStats = async (data) => {
  try {
 
//by month
    const jan = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":1}},
      { $group: { _id: 1, total: { $sum: "$amount" } } },
    ]);
 
    const feb = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":2}},
      { $group: { _id: 2, total: { $sum: "$amount" } } },
    ]);
 
    const mar = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":3}},
      { $group: { _id: 3, total: { $sum: "$amount" } } },
    ]);
 
    const apr = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":4}},
      { $group: { _id: 4, total: { $sum: "$amount" } } },
    ]);
 
    const may = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":5}},
      { $group: { _id: 5, total: { $sum: "$amount" } } },
    ]);
 
    const jun = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":6}},
      { $group: { _id: 6, total: { $sum: "$amount" } } },
    ]);
 
    const jul = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":7}},
      { $group: { _id: 7, total: { $sum: "$amount" } } },
    ]);
 
    const aug = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":8}},
      { $group: { _id: 8, total: { $sum: "$amount" } } },
    ]);
 
    const sep = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":9}},
      { $group: { _id: 9, total: { $sum: "$amount" } } },
    ]);
 
    const oct = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":10}},
      { $group: { _id: 10, total: { $sum: "$amount" } } },
    ]);
 
    const nov = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":11}},
      { $group: { _id: 11, total: { $sum: "$amount" } } },
    ]);
 
    const dec = await tproduct.aggregate([
      { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
      month: { $month: "$dop" }}},
      {$match: {userId: { $in: [data.userId] }, "year":data.year ,"month":12}},
      { $group: { _id: 12, total: { $sum: "$amount" } } },
    ]);
 
    const result = {
      M1:jan,      
      M2:feb,      
      M3:mar,      
      M4:apr,      
      M5:may,      
      M6:jun,      
      M7:jul,      
      M8:aug,      
      M9:sep,      
      M10:oct,      
      M11:nov,      
      M12:dec,      
    };
    return result;
  } catch (e) {
    console.log("this is error" + e.message);
    throw new Error("Unable to find  Total Amount: " + e.message);
  }
};


exports.dailyStats = async(data)=>{
  try {
    //dailybases
    // const daily = await tproduct.aggregate([
    //   { $project: {dop: "$dop",amount:"$amount",userId:"$userId",year: { $year: "$dop" },
    //   date: { $dayOfMonth: "$dop" }}},
    //   {$match: {userId: { $in: [data.userId] }, "year":data.year}},
    //   { $group: { _id: data.year, total: { $sum: "$amount" } } },
    // ]);

    const daily = await (await tproduct.find({"dateId": {"$gt":1, "$lt": 31},"userId":data.userId}).sort({"dop":1}))
    const result = {
      DailyAmount: daily,
    };
    return result;
  } catch (e) {
    console.log("this is error" + e.message);
    throw new Error("Unable to find  Total Amount: " + e.message);
  }
};
