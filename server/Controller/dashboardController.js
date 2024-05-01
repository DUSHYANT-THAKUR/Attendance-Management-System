let mysqlcon = require("../config/db_connection")
let moment = require("moment")
module.exports.onTimeOnLateFilter = async (req, res) => {
    try {
        // let {searchItem} = req.body;
        let date = new Date();
        let day = date.getDate().toString().padStart(2, '0'); 
        let months = (date.getMonth() + 1).toString().padStart(2, '0'); 
        let year = date.getFullYear();
        let dates = year + "-" + months + '-' + day;

        let defaultSql = "SELECT tbl_emp.name, tbl_emp.team, tbl_emp.profile_img,report.first_in, report.last_out FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id WHERE DATE(report.created_on)>=? AND report.Status = 'Present'";
        // let sqlSearch = `SELECT tbl_emp.name, tbl_emp.team, tbl_emp.profile_img, report.first_in, report.last_out FROM tbl_emp INNER JOIN report ON tbl_emp.id = report.user_id WHERE DATE(report.created_on) >= ? AND (tbl_emp.name LIKE ?  OR tbl_emp.team LIKE ?)
        // `;
        let result = await mysqlcon(defaultSql , [dates]);
        if (result.length > 0) {
            let responseData = [];

            for (let i = 0; i < result.length; i++) {
                const firstInTime = result[i].first_in.split(':');
                const hours = parseInt(firstInTime[0], 10);
                const minutes = parseInt(firstInTime[1], 10);
                let message = '';

                if (hours > 10 || (hours === 10 && minutes > 15)) {
                    message = "Late";
                } else {
                    message = "On Time";
                }

                responseData.push({
                    ...result[i],
                    message: message
                });
            }

            return res.status(200).json({
                message: "Data fetched successfully",
                data: responseData
            });
        } else {
            return res.status(404).json({
                message: "Data not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
}
module.exports.UpcomingBirthday = async (req, res) => {
    try {
        let date = new Date();
        let day = date.getDate().toString().padStart(2, '0'); 
        let months = (date.getMonth() + 1).toString().padStart(2, '0'); 
        let sql = "SELECT name, DATE_FORMAT(dob, '%Y-%m-%d') AS dob, profile_img, empid, team FROM tbl_emp WHERE DATE_FORMAT(dob, '%m-%d') >= ? ORDER BY MONTH(dob), DAY(dob);" 
        let result = await mysqlcon(sql, [months + '-' + day]); // 
        return res.status(200).json({
            result: result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
module.exports.employeeTotalAbsentPresentWeek = async (req, res) => {
    try {
      // Query to fetch all tbl_emp IDs
      let sql1 = "SELECT id,name,team FROM tbl_emp";
      let result1 = await mysqlcon(sql1);
  
      // Query to fetch absent and present counts for each employee
      let sql = `
        SELECT tbl_emp.id AS user_id,COALESCE(SUM(CASE WHEN report.status = 'Present' THEN 1 ELSE 0 END), 0) AS present_count,COALESCE(SUM(CASE WHEN report.status = 'Absent' THEN 1 ELSE 0 END), 0) AS absent_count FROM tbl_emp LEFT JOIN report ON tbl_emp.id = report.user_id WHERE WEEK(STR_TO_DATE(report.Date, '%b %d, %Y')) = WEEK(CURDATE()) AND YEAR(STR_TO_DATE(report.Date, '%b %d, %Y')) = YEAR(CURDATE()) AND WEEKDAY(STR_TO_DATE(report.Date, '%b %d, %Y')) BETWEEN 0 AND 4 GROUP BY tbl_emp.id`;
  
      let result = await mysqlcon(sql);
  
      
      let mergedResult = result1.map(emp => {
        let reportData = result.find(report => report.user_id === emp.id);
        return {
          user_id: emp.id,
          team: emp.team,
          name: emp.name,
          present_count: reportData ? reportData.present_count : 0,
          absent_count: reportData ? reportData.absent_count : 0
        };
      });
  
      return res.send({
        result: mergedResult,
        
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ status: false, message: "Error fetching.", data: [] });
    }
};
module.exports.totalPresentAbsentWeek = async (req, res) => {
    try {

        let arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        let sql1 = "SELECT Day, COALESCE(SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END), 0) AS present_count, COALESCE(SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END), 0) AS absent_count FROM report WHERE WEEK(STR_TO_DATE(Date, '%b %d, %Y')) = WEEK(CURDATE()) AND YEAR(STR_TO_DATE(Date, '%b %d, %Y')) = YEAR(CURDATE()) AND WEEKDAY(STR_TO_DATE(Date, '%b %d, %Y')) BETWEEN 0 AND 4 GROUP BY Day";
        
        let result = await mysqlcon(sql1);
        
        let mergedResult = arr.map(day => {
            let reportData = result.find(data => data.Day === day);
            if(day=="Monday")
            {
                day="Mon"
            }else if (day=="Tuesday")
            {
                day="Tue"
            }else if(day=="Wednesday")
            {
                day="Wed"
            }else if(day=="Thursday")
            {
                day="Thu"
            }else if(day=="Friday")
            {
                day="Fri"
            }
            return {
               
                Day: day,
                present_count: reportData ? reportData.present_count : 0,
                absent_count: reportData ? reportData.absent_count : 0
            };
        });
        return res.status(200).json(
            {
                result : mergedResult
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
}
module.exports.viewNotification = async (req,res) => {
    try {
        let date = new Date();
        let day = date.getDate().toString().padStart(2, '0'); 
        let months = (date.getMonth() + 1).toString().padStart(2, '0'); 
        let year = date.getFullYear();
        let dates = year + "-" + months + "-" + day
       
let sql = "SELECT name,email,message FROM tbl_notification WHERE created_on=?"
let result = await mysqlcon(sql,[dates])
return res.status(200).json(
    {
        result : result
    }
)
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message : "Internal Server Error",
                error : error
            }
        )
    }
}
module.exports.setViewNotificationStatus = async (req,res) => {
    try {
let sql = "UPDATE tbl_notification SET status = 1 WHERE status=0"
let result = await mysqlcon(sql)
return res.status(200).json(
    {
        message : "Updated Successfully"
    }
)
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message : "Internal Server Error",
                error : error
            }
        )
    }
}
module.exports.countNotification = async (req,res) => {
    try {
        let date = new Date();
        let day = date.getDate().toString().padStart(2, '0'); 
        let months = (date.getMonth() + 1).toString().padStart(2, '0'); 
        let year = date.getFullYear();
        let dates = year + "-" + months + "-" + day
        let countSql = "Select Count(created_on) AS total FROM tbl_notification WHERE status=0 AND created_on=?"
        let countResult = await mysqlcon(countSql,[dates]);
        return res.status(200).json(
            {
                result : countResult
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                result : total
            }
        )
    }
}
