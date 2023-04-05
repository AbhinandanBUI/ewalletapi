


 

exports.getDate = async () => {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    // console.log(year + "-" + month + "-" + date);
    let CurrentDate = year +"-"+ month + "-" + date;
    return CurrentDate;

}

exports.DateObject = async () => {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    // console.log(year + "-" + month + "-" + date);
    let CurrentDate = year +"-"+ month + "-" + date;
    const dateObject = {
        monthofDate : date,
        monthId : month,
        year:year,
        fullDate:CurrentDate
        }
    return dateObject;

}