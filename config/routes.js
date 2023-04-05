"use strict";

const user = require("../routes/user.routes");
const product = require("../routes/product.routes");
const loan_trans = require("../routes/loan_trans.routes");
const dashboard = require("../routes/dashboard.routes");
const salary = require("../routes/salary_account.routes");

module.exports = function (app) {
    app.use("/api/user",user);
    app.use("/api/product",product);
    app.use("/api/loan",loan_trans);
    app.use("/api/DashBoard",dashboard);
    app.use("/api/Salary",salary);
};