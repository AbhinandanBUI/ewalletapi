const dashDb = require('./database/dashboardDb');
const productDb = require('./database/productDb');


//create user  
exports.CreateDasboard = async (data) => {
    const dashId = await  dashDb.generateId();
    data.dashId = dashId;
    let createduser = await dashDb.activateDashboard(data);
    console.log("user created :?" + createduser,data.userId)
    if (createduser.userId != 0 && createduser.userId != null) {
        return 'success';
    } else {
        return 'unsuccessfull';
    }
};
//check dashboard is activate or not

exports.checkDashboard = async (params) => {
    let createduser = await dashDb.checkDashboard(params);
    // console.log("user created :?" + createduser,params.userId)
    if (createduser == 0 ) {
        return 'not activated';
    } else {
        return 'activated';
    }
};

//get dashboard 

exports.getDashboard = async (params) => {
    let createduser = await dashDb.GetDashboard(params);
    if (createduser != null) {
        return createduser;
    } else {
        return createduser;
    }
};
//amount Updater
exports.UpdateAmountDashboard = async (data) => {
    let TotalAmount = await productDb.DashboardUpdateTotalAmount(data);
    if (TotalAmount.DailyAmount.length == 0) {
        TotalAmount.DailyAmount = 0;
    }else{
        TotalAmount.DailyAmount = TotalAmount.DailyAmount[0].total;
    }
    if (TotalAmount.MonthlyAmount.length == 0) {
        TotalAmount.MonthlyAmount = 0;
    }else{
        TotalAmount.MonthlyAmount = TotalAmount.MonthlyAmount[0].total;
    }
    if (TotalAmount.YearlyAmount.length == 0) {
        TotalAmount.YearlyAmount = 0;
    }else{
        TotalAmount.YearlyAmount = TotalAmount.YearlyAmount[0].total;
    }
    if (TotalAmount.LoanSend.length == 0) {
        TotalAmount.LoanSend = 0;
    }else{
        TotalAmount.LoanSend = TotalAmount.LoanSend[0].total;
    }
    if (TotalAmount.ReceiveLoan.length == 0) {
        TotalAmount.ReceiveLoan = 0;
    }else{
        TotalAmount.ReceiveLoan = TotalAmount.ReceiveLoan[0].total;
    }
    if (TotalAmount != null) {
        return TotalAmount;
    } else {
        return TotalAmount;
    }
};


exports.WeeklyStats = async(data)=>{
const stats =  await productDb.WeeklyStats(data);
 if (stats.wd1.length == 0) {
    stats.wd1 = 0
 }else{
    stats.wd1 = stats.wd1[0].total;
 }
 if (stats.wd2.length == 0) {
    stats.wd2 = 0
 }else{
    stats.wd2 = stats.wd2[0].total;
 }
 if (stats.wd3.length == 0) {
    stats.wd3 = 0
 }else{
    stats.wd3 = stats.wd3[0].total;
 }
 if (stats.wd4.length == 0) {
    stats.wd4 = 0
 }else{
    stats.wd4 = stats.wd4[0].total;
 }
 if (stats.wd5.length == 0) {
    stats.wd5 = 0
 }else{
    stats.wd5 = stats.wd5[0].total;
 }
 if (stats.wd6.length == 0) {
    stats.wd6 = 0
 }else{
    stats.wd6 = stats.wd6[0].total;
 }
 if (stats.wd7.length == 0) {
    stats.wd7 = 0
 }else{
    stats.wd7 = stats.wd7[0].total;
 }
return stats;
}
exports.monthlyStats = async(data)=>{
const stats =  await productDb.monthlyStats(data);
 if (stats.M1.length == 0) {
    stats.M1 = 0
 }else{
    stats.M1 = stats.M1[0].total;
 }
 if (stats.M2.length == 0) {
    stats.M2 = 0
 }else{
    stats.M2 = stats.M2[0].total;
 }
 if (stats.M3.length == 0) {
    stats.M3 = 0
 }else{
    stats.M3 = stats.M3[0].total;
 }
 if (stats.M4.length == 0) {
    stats.M4 = 0
 }else{
    stats.M4 = stats.M4[0].total;
 }
 if (stats.M5.length == 0) {
    stats.M5 = 0
 }else{
    stats.M5 = stats.M5[0].total;
 }
 if (stats.M6.length == 0) {
    stats.M6 = 0
 }else{
    stats.M6 = stats.M6[0].total;
 }
 if (stats.M7.length == 0) {
    stats.M7 = 0
 }else{
    stats.M7 = stats.M7[0].total;
 }
 if (stats.M8.length == 0) {
    stats.M8 = 0
 }else{
    stats.M8 = stats.M8[0].total;
 }
 if (stats.M9.length == 0) {
    stats.M9 = 0
 }else{
    stats.M9 = stats.M9[0].total;
 }
 if (stats.M10.length == 0) {
    stats.M10 = 0
 }else{
    stats.M10 = stats.M10[0].total;
 }
 if (stats.M11.length == 0) {
    stats.M11 = 0
 }else{
    stats.M11 = stats.M11[0].total;
 }
 if (stats.M12.length == 0) {
    stats.M12 = 0
 }else{
    stats.M12 = stats.M12[0].total;
 }

return stats;
}

exports.dailyStats = async (data) => {
   let TotalAmount = await productDb.dailyStats(data);
    return TotalAmount;
};
