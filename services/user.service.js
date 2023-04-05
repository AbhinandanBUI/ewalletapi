const userDb = require("./database/userDb");
let formidable = require("formidable");
let fs = require("fs");

//generate user Id
exports.generateUserId = async (params) => {
  // console.log(params, "params");
  let userId = await userDb.generateUserId(params);
  // console.log("Email found :?" + userId.length)
  return userId.length;
};

//verifying admin  email
exports.verifyEmail = async (pemail, pmobile) => {
  // console.log(params, "params");
  let findEmail = await userDb.verifyEmail(pemail, pmobile);
  // console.log("Email found :?" + findEmail.length)
  return findEmail.length;
};

//all user
exports.allUser = async () => {
  // console.log(params, "params");
  let userlist = await userDb.allUser();
  // console.log("Email found :?" + userlist.length)
  return userlist;
};
exports.GetAccount = async (data) => {
  // console.log(params, "params");
  let userlist = await userDb.GetAccount(data);
  // console.log("Email found :?" + userlist.length)
  return userlist;
};

//create user
exports.createadmin = async (params) => {
  // console.log("this is my paramerters", params);
  let createduser = await userDb.create(params);
  // console.log("user created :?" + createduser,params.userId)
  return createduser;
};


///-------updating user profile ----
exports.updateUserProfile = async (data)=>{
    let result = await userDb.updateUserProfile(data);
    return result;
}


///
//login user api

exports.login = async (params) => {
  // console.log("this is my paramerters", params);
  let loginuser = await userDb.login(params);
  try {
    if (loginuser != "user do not found") {
      const userdetails = loginuser;
      const User = {
        userId: userdetails.userId,
        first_name: userdetails.first_name,
        last_name: userdetails.last_name,
        mobile: userdetails.mobile,
        email: userdetails.email,
        roleId: userdetails.roleId,
      };
      const model = {
        message: "login success",
        token: userdetails._id,
        success: true,
        responseData: User,
      };
      return model;
    } else {
      const model = {
        message: "login failed",
        success: false,
        // totalRecord:userdetails.length,
        responseData: "",
      };
      return model;
    }
  } catch (e) {
    return "api error occure :", e;
  }
};
 