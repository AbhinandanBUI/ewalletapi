const salaryDb = require("./database/salary_accountDb");
const commonservice = require("./common.service");

//generate user Id
exports.generateUserId = async () => {
  let result = await salaryDb.generateUserId();
  console.log("salaryID generated" + result.length);
  return result.length;
};

//#create salary Account

exports.Create = async (data) => {
  let date = await commonservice.getDate();
  const dateobj = await commonservice.DateObject();
  data.DateOfSalary = date;
  data.dateId = dateobj.monthofDate;
  data.monthId = dateobj.monthId;
  data.DateOfSalary = dateobj.year + "-" + dateobj.monthId + "-" + "07";
  data.CreditedDateOfSalary = date;
//   console.log(data);
  const salaryExist = await salaryDb.VerifySalaryDetails(data.userId,data.monthId);
  if ( salaryExist.length == 0 ) {
  let result = await salaryDb.create(data);
  if (result.userId == data.userId) {
    return "success";
  } else {
    return result + "something bad happend ?";
  }
  } else {
    return 'salary Already Exist';
  }
  
};
//#Get Account Details
exports.GetSalaryAccount = async (data) => {
  let result = await salaryDb.GetSalaryDetails(data);

   return result;
};
//#Verify  Salary month Details
exports.VerifySalaryAccount = async (data) => {
  let result = await salaryDb.VerifySalaryDetails(data);
  if (result.length >0) {
    return 'salary already exist';
  } else {
    return 'salary not exist';
  }
   return result;
};

