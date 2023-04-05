const userservice = require("../services/user.service");
const fileservice = require("../services/userProfile");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const userController = {};

//addUser
userController.addUser = async (req, res) => {
  try {
    const data = req.body;
    const isEmail = await userservice.verifyEmail(data.email, data.mobile);
    if (isEmail == 0) {
      const userid = await userservice.generateUserId(data);
      data.userId = userid + 1;
      // console.log(data);
      if (data.userId > userid) {
        const result = await userservice.createadmin(data);
        const model = {
          success: true,
          message: "The user created successfully.",
          resultModel: {
            userId: result.userId,
          },
        };
        res.send(model);
      } else {
        res.send({ message: "user does not created ?" });
      }
    } else {
      const model = {
        success: false,
        message: "That email address is already registered..",
        responseData: isEmail,
      };
      res.send(model);
    }
  } catch (e) {
    throw new Error("Unable to create user: " + e.message);
  }
};
//get id
userController.UserID = async (req, res) => {
  const userid = await userservice.generateUserId(data);
  // console.log(userid);
};

//allUser
userController.allUser = async (req, res) => {
  try {
    const userlist = await userservice.allUser();
    if (userlist.length >= 1) {
      const model = {
        message: "Successfully",
        success: true,
        totalRecord: userlist.length,
        responseData: userlist,
      };
      res.send(model);
    } else {
      const model = {
        message: "no record found",
        success: false,
        totalRecord: userlist.length,
        responseData: "",
      };
      res.send(model);
    }
  } catch (e) {
    throw new Error("Unable to fetch all  user: " + e.message);
  }
};
userController.GetAccount = async (req, res) => {
  try {
    let data = req.body;
    const userlist = await userservice.GetAccount(data);
    if (userlist.length >= 1) {
      const model = {
        message: "Successfully",
        success: true,
        totalRecord: userlist.length,
        responseData: userlist,
      };
      res.send(model);
    } else {
      const model = {
        message: "no record found",
        success: false,
        totalRecord: userlist.length,
        responseData: "",
      };
      res.send(model);
    }
  } catch (e) {
    throw new Error("Unable to fetch all  user: " + e.message);
  }
};

userController.login = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    if (data.email != "" && data.password != "") {
      const userdetails = await userservice.login(data);
      res.send(userdetails);
    } else {
      const model = {
        message: "is null " + data.email + "" + data.password,
        success: false,
      };
      res.send(model);
    }

    //    res.send('body is null');
  } catch (e) {
    throw new Error("please try again api says  " + e.message);
  }
};

userController.uploadImage = async (req, res) => {
  try {
    
    const result = await fileservice.copyUser(req,res);
    if (result.fileName) {
      const model = {
        message: "Image uploaded successfully" ,
        success: true,
        responseData:result
      };
      res.send(model);
    }else{
      const model = {
        message: "something went wrong" ,
        success: false,
        responseData:'++++'
      };
      res.send(model);
    }
   
  } catch (e) {
    throw new Error("please try again api says  " + e.message);
  }
};
userController.updateImageDetails = async (req, res) => {
  try {
    const result = req.body;
    const data = await userservice.updateUserProfile(result);
    if (data) {
      const model = {
        message: "successfully" ,
        success: true,
        responseData:result
      };
      res.send(model);
    }else{
      const model = {
        message: "something went wrong" ,
        success: false,
        responseData:'++++'
      };
      res.send(model);
    }
   
  } catch (e) {
    throw new Error("please try again api says  " + e.message);
  }
};
userController.getUserImage = async (req, res) => {
  try {
    const result = req.body;
    const data = await  fileservice.getUserImage(result);
    
      const model = {
        message: "successfully" ,
        success: true,
        responseData:data
      };
      res.send(model);
    
   
  } catch (e) {
    throw new Error("please try again api says  " + e.message);
  }
};

module.exports = userController;
