const dashboardservice = require('../services/dashboard.service');
 const pdb = require('./../model/product.model');
 

const dashboardController = {};

//create new transition
dashboardController.createDashboard = async (req, res) => {
    try {
        const data = req.body;
        const result = await dashboardservice.CreateDasboard(data);
        if (result == 'success') {
            let model = {
                message: result,
                success: true,
                responseData: 'record created successfully'

            }
            res.send(model)
        } else {
            let model = {
                message: result,
                success: false,
                responseData: 'something wrong '
            }
            res.send(model)
        }

    } catch (e) {
        throw new Error('Unable to create user: ' + e.message);
    }
}
//end
//by user id
dashboardController.checkDashboard = async (req, res) => {
    let Id = req.body.userId;
    const result = await dashboardservice.checkDashboard(Id);
    if (result == 'activated') {

        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }

}
//end
dashboardController.getDashboard = async (req, res) => {
    let Id = req.body.userId;
    const result = await dashboardservice.getDashboard(Id);
    if (result != null) {

        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }

}

dashboardController.getDashboardAmount = async (req, res) => {
    let data = req.body;
    const result = await dashboardservice.UpdateAmountDashboard(data);
    if (result != null) {

        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }

}

dashboardController.WeeklyStats = async(req,res) =>{
    let data = req.body;
    const result = await dashboardservice.WeeklyStats(data);

    // const daily = await pdb.aggregate([
    //     { $match: { userId: { $in: [data.userId] }, dop: { $in: [data.dop] } } },
    //     { $group: { _id: "$isActive", total: { $sum: "$amount" } } },
    //   ]);
    // const yearly = await pdb.aggregate([
    //     { $match: { userId: { $in: [data.userId] }, isActive: { $in: [1] } } },
    //     { $group: { _id:  { $year:  "$dop"  }, total: { $sum: "$amount" } } },
    //   ]).sort({"_id":1});
    // const curdate = await pdb.aggregate([
    //     { $match: { userId: { $in: [data.userId] }, isActive: { $in: [1] } } },
    //     { $group: { _id: { $dayOfMonth:  "$dop"  }, total: { $sum: "$amount" } } },
    //   ]).sort({"_id":1});
    // const monthly = await pdb.aggregate([
    //     { $match: { userId: { $in: [data.userId] }, isActive: { $in: [1] } } },
    //     { $group: { _id: { $month:  "$dop"  }
    //     , total: { $sum: "$amount" } } },
    //   ]).sort({"_id":1});
    // const weekly = await pdb.aggregate([
    //     { $match: { userId: { $in: [data.userId] }, isActive: { $in: [1] } } },
    //     { $group: { _id: { $week:  "$dop"  }
    //     , total: { $sum: "$amount" } } },
    //   ]).sort({"_id":1});
    // const dayOfWeek = await pdb.aggregate([
    //     { $match: { userId: { $in: [data.userId] }, isActive: { $in: [1] } } },
    //     { $group: { _id: { $dayOfWeek:  "$dop"  }
    //     , total: { $sum: "$amount" } } },
    //   ]).sort({"_id":1});

    //   console.log(yearly);
    //   const result ={
    //     dal:daily,
    //     wk:dayOfWeek,
    //     month:monthly,
    //     day:curdate,
    //     weel:weekly,
    //     yr:yearly
    //   }


    if (result != null) {

        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }
}

dashboardController.monthlyStats = async(req,res) =>{
    let data = req.body;
    const result = await dashboardservice.monthlyStats(data);
        if (result != null) {
        let model = {
            message: 'success',
            success: true,
            totalRecord: result.length,
            responseData: result
        }
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }
}
dashboardController.dailyStats = async(req,res) =>{
    let data = req.body;
    const result = await dashboardservice.dailyStats(data);
        if (result != null) {
        let model = {
            message: 'success',
            success: true,
            totalRecord: result.DailyAmount.length ,
            responseData: result
        }
        
        res.send(model)
    } else {
        let model = {
            message: 'no record found',
            success: false,
            totalRecord: 0,
            responseData: result
        }
        res.send(model)
    }
}



module.exports = dashboardController