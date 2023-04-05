const salary_accountservice = require("../services/salary_account.service");

const salary_accountController = {};

//# Create  Account
salary_accountController.create = async (req, res) => {
  try {
    const data = req.body;
    const salaryId = await salary_accountservice.generateUserId();
    data.salaryId = salaryId + 1;
    // const salaryExist = await salary_accountservice.VerifySalaryAccount(data);
    const result = await salary_accountservice.Create(data);
    if (result == "success" || result == 'salary Already Exist') {
      const model = 
      {
        message: "successfull",
        status: 200,
        success: true,
        responseData: result,
      };
      res.send(model);
    } else {
      const model = {
        message: "unsuccessfull",
        status: 400,
        success: false,
        responseData: "not created",
      };
      res.send(model);
    }
  } catch (e) {
    throw new Error("Unable to create user: " + e.message);
  }
};

//GetSalary Details
salary_accountController.GetBasicDetails = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await salary_accountservice.GetSalaryAccount(data);
    if (result) {
      const model = 
      {
        message: "successfull",
        status: 200,
        success: true,
        TotalRecords:result.length,
        responseData: result,
      };
      res.send(model);
    } else {
      const model = {
        message: "unsuccessfull",
        status: 400,
        TotalRecords:0,
        success: false,
        responseData: "not created",
      };
      res.send(model);
    }
  } catch (e) {
    throw new Error("Unable to create user: " + e.message);
  }
};


module.exports = salary_accountController;
