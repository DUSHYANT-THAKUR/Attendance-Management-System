let mysqlcon = require("../config/db_connection")
const moment = require('moment');
const currentDate = moment().format('MMM DD, YYYY');
module.exports.defaultEmployeeAttendance = async (req, res) => {
  const currentDate = moment().format('MMM DD, YYYY');
  try {
    let { searchitem, date, from, to } = req.body
    let page = req.body.page ? Number(req.body.page) : 1;

    let limit = 10;
    let start = page * limit - limit;
    
    let sql, sql1, result, result1;


    if (searchitem) {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where tbl_emp.name LIKE ? OR tbl_emp.empid LIKE ? ORDER BY report.created_on DESC LIMIT ?,?";
      sql1 = "SELECT COUNT(*)AS Total FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where tbl_emp.name LIKE ? OR tbl_emp.empid LIKE ?"
      result1 = await mysqlcon(sql1, [searchitem + "%", searchitem + "%"])
      result = await mysqlcon(sql, [searchitem + "%", searchitem + "%", start, limit])

    } else if (date) {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where DATE(report.created_on) = ? ORDER BY report.created_on DESC LIMIT ?,?";
      sql1 = "SELECT COUNT(*)AS Total FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where DATE(report.created_on) = ?"
      result1 = await mysqlcon(sql1, [date])
      result = await mysqlcon(sql, [date, start, limit])

    }
    else if (from && to) {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where DATE(report.created_on) >= ? AND DATE(report.created_on) <= ? ORDER BY report.created_on DESC LIMIT ?,?";
      sql1 = "SELECT COUNT(*)AS Total FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where DATE(report.created_on) >= ? AND DATE(report.created_on) <= ?"
      result1 = await mysqlcon(sql1, [from, to])
      result = await mysqlcon(sql, [from, to, start, limit])
    }
    else {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where Date=? ORDER BY report.created_on DESC LIMIT ?,?";
      sql1 = "SELECT COUNT(*)AS Total FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where Date=?"
      result1 = await mysqlcon(sql1, [currentDate])
      result = await mysqlcon(sql, [currentDate, start, limit])
    }


    let total = result1[0].Total;
    let numOfPages = Math.ceil(total / limit);

    let startRange = start + 1;
    let endRange = start + result.length;

    if (result.length > 0) {
      return res.status(200).json({
        message: total > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
        Status: "success",
        currentPage: page,
        totalPage: numOfPages,
        data: result
      })
    }
    else {
      return res.status(201).json({ message: "data not found" })
    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: err

    })
  }
}
module.exports.downloadEmployeeAttendance=async(req,res)=>{
  const currentDate = moment().format('MMM DD, YYYY');
  try {
    let user = req.user;
    let {searchitem,date,from,to}=req.body

    let sql,result;


    if(searchitem)
    {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where tbl_emp.name LIKE ? OR tbl_emp.empid LIKE ?";
       result=await mysqlcon(sql,[searchitem + "%", searchitem + "%"])

    }else if(date)
    {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where DATE(report.created_on) = ?";
       result=await mysqlcon(sql,[date])

    }
    else if(from && to)
    {
      sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where DATE(report.created_on) >= ? AND DATE(report.created_on) <= ?";
       result=await mysqlcon(sql,[from,to])
    }
    else
    {
       sql = "SELECT report.* ,tbl_emp.name,tbl_emp.empid FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id where Date=?";
        result=await mysqlcon(sql,[currentDate])
    }
    

     if(result.length>0)
     {
return res.send(result)
    }
    else
    {
     return res.status(201).json({message:"data not found"})
    }

  } catch (err) {
      console.log(err)
    return res.status(500).json({
      message: err

    })
  }

}
module.exports.absentDataEntry=async(req,res)=>{
  const currentDate = moment().format('MMM DD, YYYY');
  const currentDay = moment().format('dddd');
  let sql11 = "select id from tbl_emp"
  let sql12 = "select user_id from report where Date=?"
  let result11 = await mysqlcon(sql11)
  let result12 = await mysqlcon(sql12, [currentDate])
  for (let i = 0; i < result11.length; i++) {
    let count = 0;
    for (let j = i + 1; j < result12.length; j++) {
      if (result11[i] == result12[j]) {
        count = 1;
      }
    }
    if (count == 0) {

      let sqll =
        "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d') AS created_on FROM report where user_id=? ORDER BY created_on DESC LIMIT 1";
      let result = await mysqlcon(sqll, [result11[i].id]);

      if (result.length > 0) {
        let latestEntryDate = result[0].created_on;
        const latestEntryDateMoment = moment(latestEntryDate).add(1, "day");
        let currentDate22 = moment().subtract(0, "day");
        const currentDate1Moment = moment(currentDate22);
        let currentDate11 = latestEntryDateMoment.clone();
        while (currentDate11.isSameOrBefore(currentDate1Moment)) {
          let details = {
            date: moment(currentDate11).format("MMM DD, YYYY"),
            user_id: result11[i].id,
            Status: "Absent",
            Day: moment(currentDate11).format("dddd"),
            
          };
          let sqlInsert = "INSERT INTO report SET ?";
          let resultInsert = await mysqlcon(sqlInsert, details);
          currentDate11.add(1, "day");
        }
      }
    }

  }


return res.status(200).json({
  message:"data inserted succfully"
})

}
