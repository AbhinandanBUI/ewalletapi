const productservice = require('../services/product.service');


const tproductController = {};

//addUser
tproductController.addProduct = async (req, res) => {
    try {
        const data = req.body;
        const result = await productservice.createpeoduct(data);
        const ress = await productservice.createMpeoduct(result);
        
        if (ress == 'success') {
            let model = {
                message: ress,
                success: true
            }
            res.send(model)
        } else {
            let model = {
                message: ress,
                success: false
            }
            res.send(model)
        }

    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}

tproductController.ByUserId = async(req,res)=>{
    try {
        const data = req.body.userId;
       
        const result = await productservice.allProduct(data);
        if (result !='no data') {
            let model = {
                message: 'success',
                success: true,
                TotalRecord:result.length,
                responseData:result
            }
            res.send(model)
        } else {
            let model = {
                message: 'no record found',
                success: false,
                TotalRecord:result,
                responseData:result
            }
            res.send(model)
        }
    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}
tproductController.filterproduct = async(req,res)=>{
    try {
        const data = req.body;
       
        const result = await productservice.filterproduct(data);
        if (result !='no data') {
            let model = {
                message: 'success',
                success: true,
                TotalRecord:result.length,
                responseData:result
            }
            res.send(model)
        } else {
            let model = {
                message: 'no record found',
                success: false,
                TotalRecord:result,
                responseData:result
            }
            res.send(model)
        }
    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}


function filterSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number().allow(""),
        userId: Joi.number().allow(""),
    });
    console.log(req.body);
    validateRequest(req, next, schema);
}


module.exports = tproductController