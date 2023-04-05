const express = require('express');
const router = express.Router();
const salary_accountController = require('../controller/salary_account.controller');
//add admin record

router.post('/Create',
  salary_accountController.create
);
 
router.post('/GetSalaryDetails',
salary_accountController.GetBasicDetails
)

module.exports = router;