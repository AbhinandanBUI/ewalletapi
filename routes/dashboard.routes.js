const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard.controller');


// router.get('/allproduct',
//     tproductController.allUser
// );


router.post('/CheckActivateDashBoard',
    dashboardController.checkDashboard
);
router.post('/ActivateDashBoard',
    dashboardController.createDashboard
);
router.post('/GetDashBoard',
    dashboardController.getDashboard
);
 
router.post('/amount',
  dashboardController.getDashboardAmount
);
router.post('/stats/weekly',
  dashboardController.WeeklyStats
);
router.post('/stats/monthly',
  dashboardController.monthlyStats
);
router.post('/stats/daily',
  dashboardController.dailyStats
);




module.exports = router;