const salary_account = require('../../model/salaryAccount.model');



exports.generateUserId = async ()=>{
    try {
        let salaryId = await salary_account.find();
        return salaryId;
    } catch (e) {
        throw new Error('Unable to generate  salaryId: ' + e.message)
    }
}

//#create Account
exports.create = async (data) => {
    try {
        let salaryData = ({
            userId:data.userId,
            salaryId:data.salaryId,
            name: data.name,
            SalaryDetails:[{
                CompanyName:data.SalaryDetails[0].CompanyName,
                totalSalary:data.SalaryDetails[0].totalSalary,
                DateOfSalary:data.SalaryDetails[0].DateOfSalary
            }],
            creditedSalary:data.creditedSalary,
            CreditedDateOfSalary:data.CreditedDateOfSalary,
            monthId:data.monthId,
            dateId:data.dateId,
            isActive: 1,
            isDelete: 0,
        })
        const user = await new salary_account(salaryData).save()

        return user
    } catch (e) {
        throw new Error('Unable to create admin: ' + e.message)
    }
}

exports.GetSalaryDetails = async(data) =>{
    try {
        let result = await salary_account.find({userId:data.userId});
        return result;
    } catch (e) {
        throw new Error('Unable to find  account: ' + e.message);
    }
}
exports.VerifySalaryDetails = async(puserId,pmonthId) =>{
    try {
        let result = await salary_account.find({userId:puserId,monthId:pmonthId});
        return result;
    } catch (e) {
        throw new Error('Unable to find  account: ' + e.message);
    }
}