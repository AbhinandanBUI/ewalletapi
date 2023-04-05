const order = require("../../model/order.model");
 
 

exports.create = async (data) => {
  try {
    let productData = {
      userId: data.userId,
      productName: data.productName_Id,
      
      amount: data.amount,
      payFrom: data.payFrom,
      isActive: 1,
      isDelete: 0,
    };
    const result = await new order(productData).save();
    return result;
  } catch (e) {
    throw new Error("Unable to create Product: " + e.message);
  }
};
//chart insert data

//get all product
exports.allProduct = async (data) => {
  try {
    const result = await order.find({ userId: data });
    return result;
  } catch (e) {
    throw new Error("Unable to  Product: " + e.message);
  }
};
 
 
 