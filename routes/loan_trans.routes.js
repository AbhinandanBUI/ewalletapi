const express = require('express');
const router = express.Router();
const loan_transController = require('../controller/loan_trans.controller');


// router.get('/allproduct',
//     tproductController.allUser
// );

router.post('/GetLoan',
    loan_transController.ByUserId
);
router.post('/addloan',
    loan_transController.addloan_trans
);
router.post('/CreateAccount',
    loan_transController.createAccount
);
router.post('/GetLoanAccount',
    loan_transController.GetLoanAccount
);
router.post('/UpdatedAmount',
    loan_transController.UpdatedAmount
);
router.post('/ViewLoanTransition',
    loan_transController.ViewLoanTransition
);

//

router.get('/GetIp',
    loan_transController.getIpAddress
);



module.exports = router;