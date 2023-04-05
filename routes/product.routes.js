const express = require('express');
const router = express.Router();
const tproductController = require('../controller/product.controller');
const orderController = require('../controller/order.controller');

 

router.post('/allProduct',
    tproductController.ByUserId
);
router.post('/addProduct',
    tproductController.addProduct
);
router.post('/filterproduct',
    tproductController.filterproduct
);
router.post('/saveOrder',
orderController.addOrder
);
router.post('/allOrder',
orderController.allOrder
);

module.exports = router;