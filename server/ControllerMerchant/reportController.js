const mysqlcon = require('../config/db_connection');
const moment = require('moment');
const currentDate = moment().format('MMM DD, YYYY');
const currentTime = moment().format('hh:mm:ss A')
const currentDay = moment().format('dddd');
const payoutMethods = {
  defaultReport: async (req, res) => {
    let user = req.user;
    let { id } = req.body
    var { uniqueid } = req.body;
    const { Date } = req.body;
    const { from, to } = req.body;
    let filterType = req.body.filterType ? Number(req.body.filterType) : 1;
    //for pagination
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = 10;
    let start = page * limit - limit;
    let sql, sql1;
    let arr = [],
      arr1 = [];
    try {

      if (id) {
        const merchantIdArray = id.split(',');
        if (filterType === 1) {
          // 1 Default Page
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE user_id = ?";
          arr = [merchantIdArray];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE user_id = ?  ORDER BY id DESC LIMIT ?,?";
          arr1 = [merchantIdArray, start, limit];
        } else if (filterType === 2) {
          // 2 - search by OrderID
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE user_id = ? AND Status LIKE ?";
          arr = [merchantIdArray, uniqueid + "%"];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE user_id = ? AND Status LIKE ? ORDER BY id DESC LIMIT ?,?";
          arr1 = [merchantIdArray, uniqueid + "%", start, limit];
        } else if (filterType === 3) {
          // 3 - Today, Yesterday
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE DATE(created_on) = ? AND user_id = ?";
          arr = [Date, merchantIdArray];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE DATE(created_on) = ? AND user_id = ? ORDER BY id DESC LIMIT ?,?";
          arr1 = [Date, merchantIdArray, start, limit];
        } else if (filterType === 4) {
          // 4 - Custom Date
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND user_id = ?";
          arr = [from, to, merchantIdArray];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND user_id = ? ORDER BY id DESC LIMIT ?,?";
          arr1 = [from, to, merchantIdArray, start, limit];
        }
        let data = await mysqlcon(sql, arr);
        let total = data[0].Total;
        let numOfPages = Math.ceil(total / limit);

        let result = await mysqlcon(sql1, arr1);
        if (result.length === 0) {
          return res.status(201).json({
            message: "No record found.",
            data: [],
          });
        }

        let startRange = start + 1;
        let endRange = start + result.length;
        return res.status(200).json({
          message: `Showing ${startRange} to ${endRange} data from ${total}`,
          Status: "success",
          currPage: page,
          totalPage: numOfPages,
          data: result,
        });


      } else {
      
        if (filterType === 1) {
          
          sql = "SELECT COUNT(*) AS Total FROM report WHERE user_id = ?";
          arr = [user.id];
          sql1 = "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE user_id = ?  ORDER BY id DESC LIMIT ?,?";
          arr1 = [user.id, start, limit];

        }

        else if (filterType === 2) {
          // 2 - search by Absent And Present
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE user_id = ? AND Status LIKE ?";
          arr = [user.id, uniqueid + "%"];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE user_id = ? AND Status LIKE ? ORDER BY id DESC LIMIT ?,?";
          arr1 = [user.id, uniqueid + "%", start, limit];
        } else if (filterType === 3) {
          // 3 - Today, Yesterday
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE DATE(created_on) = ? AND user_id = ?";
          arr = [Date, user.id];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE DATE(created_on) = ? AND user_id = ? ORDER BY id DESC LIMIT ?,?";
          arr1 = [Date, user.id, start, limit];
        } else if (filterType === 4) {
          // 4 - Custom Date
          sql =
            "SELECT COUNT(*) AS Total FROM report WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND user_id = ?";
          arr = [from, to, user.id];
          sql1 =
            "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM report WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND user_id = ? ORDER BY id DESC LIMIT ?,?";
          arr1 = [from, to, user.id, start, limit];
        }
        let data = await mysqlcon(sql, arr);
        let total = data[0].Total;
        let numOfPages = Math.ceil(total / limit);

        let result = await mysqlcon(sql1, arr1);
        if (result.length === 0) {
          return res.status(201).json({
            message: "No record found.",
            data: [],
          });
        }

        let startRange = start + 1;
        let endRange = start + result.length;

        return res.status(200).json({
          message: `Showing ${startRange} to ${endRange} data from ${total}`,
          Status: "success",
          currPage: page,
          totalPage: numOfPages,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(201)
        .json({ status: false, message: "Some error occured" });
    }
  },
  createReport: async (req, res) => {
    
    try {
      const currentDate = moment().format('MMM DD, YYYY');
const currentTime = moment().format('hh:mm:ss A')
const currentDay = moment().format('dddd');
      let user = req.user;
      let sqlCheckDate = "SELECT * FROM report WHERE date = ? AND user_id=?";
      let resultCheckDate = await mysqlcon(sqlCheckDate, [
        currentDate,
        user.id,
      ]);


      let sqll =
        "SELECT report.*, DATE_FORMAT(created_on,'%Y-%m-%d') AS created_on FROM report ORDER BY created_on DESC LIMIT 1";
      let result = await mysqlcon(sqll);
      
      if (result.length > 0) {
        let latestEntryDate = result[0].created_on;
        const latestEntryDateMoment = moment(latestEntryDate).add(1, "day");
        let currentDate22 = moment().subtract(1, "day");
        const currentDate1Moment = moment(currentDate22);
        let currentDate11 = latestEntryDateMoment.clone();
        while (currentDate11.isSameOrBefore(currentDate1Moment)) {
          let details = {
            date: moment(currentDate11).format("MMM DD, YYYY"),
            user_id: user.id,
            Status: "Absent",
            Day: moment(currentDate11).format("dddd"),
            First_in: "-",
          };
          let sqlInsert = "INSERT INTO report SET ?";
          let resultInsert = await mysqlcon(sqlInsert, details);
          currentDate11.add(1, "day");
        }
      }
      if (resultCheckDate.length == 0) {
        let details = {
          date: currentDate,
          user_id: user.id,
          Status: "Present",
          Day: currentDay,
          First_in: currentTime,
         
        };
        let sqlInsert = "INSERT INTO report SET ?";
        let resultInsert = await mysqlcon(sqlInsert, details);
      }else if(resultCheckDate[0].Status!== "Present")
      {
        let details = {
          date: currentDate,
          user_id: user.id,
          Status: "Present",
          Day: currentDay,
          First_in: currentTime,
         
        };
        let sqlUpdate = "UPDATE report SET ? WHERE date = ? AND user_id = ?";
        let resultUpdate = await mysqlcon(sqlUpdate, [details, currentDate, user.id]);

      }


      return res.status(200).json({
        message: "Inserted Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  },
  reportCard: async (req, res) => {
    try {
      const { id, from, to, date, searchitem } = req.body;
      const user = req.user;
      //console.log(user.id)
      let whereClause;
      const parameters = [];
      const conditions = [];

      if (id) {
        const merchantIdArray = id.split(",");
        whereClause = "user_id IN (?)";
        parameters.push(merchantIdArray);
      } else {
        whereClause = "user_id = ?";
        parameters.push(user.id);
      }

      const sql1 = `SELECT COUNT(Status)AS Status FROM report WHERE Status = ? AND ${whereClause}`;
      const sql2 = `SELECT COUNT(Status)AS Status FROM report WHERE ${whereClause}`;
      if (from && to) {
        conditions.push(
          `DATE(report.created_on) >= ? AND DATE(report.created_on) <= ? `
        );
        parameters.push(from, to);
      } else if (date) {
        conditions.push(`DATE(created_on) = ?`);
        parameters.push(date);
      } else if (searchitem) {
        conditions.push(`Status LIKE ?`);
        parameters.push(`%${searchitem}%`);
      }

      const sql =
        conditions.length > 0
          ? `${sql1} AND (${conditions.join(" AND ")})`
          : sql1;

      const TotaDays = await mysqlcon(sql2, [...parameters]);
      const present = await mysqlcon(sql, ["Present", ...parameters]);
      const absent = await mysqlcon(sql, ["Absent", ...parameters]);
      const halfday = await mysqlcon(sql, ["Half Day", ...parameters]);

      if (TotaDays == 0) {
        return res.json(201, {
          message: `User has no transaction`,
          data: [
            {
              name: "Total Days",
              amount: 0,
            },
            {
              name: "Present",
              amount: 0,
            },
            {
              name: "Absent",
              amount: 0,
            },
            {
              name: "Half Day",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          message: `All Status Data`,
          data: [
            {
              name: "Total Days",

              amount: TotaDays[0].Status !== null ? TotaDays[0].Status : 0,
            },
            {
              name: "Present",

              amount: present[0].Status !== null ? present[0].Status : 0,
            },
            {
              name: "Absent",

              amount: absent[0].Status !== null ? absent[0].Status : 0,
            },
            {
              name: "Half Day",
              amount: halfday[0].Status !== null ? halfday[0].Status : 0,
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Some error occurred" });
    }
  },
  viewReport: async (req, res) => {
    let user = req.user;
    const { uniqueid } = req.body;
    let { id } = req.body;
    try {
      if (id) {
        let sql =
          "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE uniqueid = ? AND users_id = ?";
        let result = await mysqlcon(sql, [uniqueid, id]);
        return res.status(200).json({
          message: "Transection details are : ",
          data: result,
        });
      } else {
        let sql =
          "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE uniqueid = ? AND users_id = ?";
        let result = await mysqlcon(sql, [uniqueid, user.id]);
        return res.status(200).json({
          message: "Transection details are : ",
          data: result,
        });
      }
    } catch (error) {
      return res
        .status(201)
        .json({ status: false, message: "Some error occured", data: [] });
    }
  },
  punchoutReport: async (req, res) => {
    const currentDate = moment().format('MMM DD, YYYY');
    const currentTime = moment().format('hh:mm:ss A')
    let user = req.user
    let sql = "update report set Last_out=? where user_id=? AND Date=?"
    let result = await mysqlcon(sql, [currentTime, user.id, currentDate])

    let sql1 = "select First_in from report where user_id=? AND Date=?"
    let result1 = await mysqlcon(sql1, [user.id, currentDate])
    let entrytime = result1[0].First_in

    let entryTime = moment(entrytime, 'hh:mm:ss A');
    let currenttime = moment(currentTime, 'hh:mm:ss A');
     //console.log(entryTime)
    //console.log(currenttime)
    let differenceInMillis = currenttime.diff(entryTime);
    let duration = moment.duration(differenceInMillis);
    let hours = Math.abs(duration.hours()).toString().padStart(2, '0');
    let minutes = Math.abs(duration.minutes()).toString().padStart(2, '0');
    let seconds = Math.abs(duration.seconds()).toString().padStart(2, '0');
    
    const difftime = `${hours}:${minutes}:${seconds}`;
   //console.log(difftime);
    let sql2 = "update report set Total_in_time=? where user_id=? AND Date=?"
    let result2 = await mysqlcon(sql2, [difftime, user.id, currentDate])
    if (result.affectedRows > 0 && result2.affectedRows > 0) {
      return res.status(200).json({ message: "update successfully" })
    }
    else {
      return res.status(200).json({ message: "data not found" })
    }

  },
  downloadReport: async (req, res) => {
    let user = req.user;
    const { to, from, id, date, days } = req.body;
    //  console.log(from, to);
    try {
      if (id) {
        if (days != undefined) {
          let sql = "SELECT * from report where status=? AND user_id=?";
          let result = await mysqlcon(sql, [days, id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else if (from && to) {
          let sql =
            "SELECT * from report where user_id=? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
          let result = await mysqlcon(sql, [id, from, to]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else if (date) {
          let sql =
            "SELECT * from report where  user_id=? AND DATE(created_on) = ?";
          let result = await mysqlcon(sql, [id, date]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else {
          let sql = "SELECT * from report where user_id=?";
          let result = await mysqlcon(sql, [id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        }
      } else {
        if (days != undefined) {
          let sql = "SELECT * from report where status=? AND user_id=?";
          let result = await mysqlcon(sql, [days, user.id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else if (from && to) {
          let sql =
            "SELECT * from report where  user_id=? AND DATE(created_on)  >= ? AND DATE(created_on) <= ?";
          let result = await mysqlcon(sql, [user.id, from, to]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else if (date) {
          let sql =
            "SELECT * from report where  user_id=? AND DATE(created_on) = ?";
          let result = await mysqlcon(sql, [user.id, date]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        } else {
          let sql = "SELECT * from report where user_id=?";
          let result = await mysqlcon(sql, [user.id]);
          if (result.length === 0) {
            res.send(result);
          } else {
            res.send(result);
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res
        .status(201)
        .json({ status: false, message: "Some error occured", data: [] });
    }
  },
};
module.exports = payoutMethods;