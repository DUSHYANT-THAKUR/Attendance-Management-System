let mysqlcon = require("../config/db_connection")

module.exports.allHolidays = async(req,res) => {
    try {
        let date = new Date();
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        let formattedDate = `${year}-${month}-${day}`;
let sql = "SELECT event_name AS title, DATE_FORMAT(from_date, '%Y-%m-%d') AS start FROM holidays WHERE from_date>=?";
let result = await mysqlcon(sql,[formattedDate]);
for(let i=0;i<result.length;i++){
    result[i].backgroundColor = "green"
}
return res.status(200).json(
    {
        result : result
    }
)
    } catch (error) {
        console.log(error)
    }
}