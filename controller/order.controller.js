const orderservice = require('../services/order.service');


const orderController = {};

//addUser
orderController.addOrder = async (req, res) => {
    try {
        const data = req.body;
        const result = await orderservice.createpeoduct(data);
        if (result != '') {
            let model = {
                message: result,
                success: true
            }
            res.send(model)
        } else {
            let model = {
                message: result,
                success: false
            }
            res.send(model)
        }
    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}
 
orderController.allOrder = async (req, res) => {
    try {
        const data = req.body.userId;
        const result = await orderservice.allProduct(data);
        if (result != 'no data') {
            let model = {
                message: "success",
                success: true,
                TotalRecord:result.length,
                responseData:result
            }
            res.send(model)
        } else {
            let model = {
                message: "no record found ???",
                success: false
            }
            res.send(model)
        }
    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}
 


module.exports = orderController