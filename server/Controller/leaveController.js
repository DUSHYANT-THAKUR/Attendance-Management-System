let mysqlcon = require("../config/db_connection")

module.exports.leaveDetails = async (req, res) => {
    try {

       const {searchitem}=req.body
      let page = req.body.page ? Number(req.body.page) : 1;

      let limit = 10;
      let start = page * limit - limit;
      let result,result1;

      if(searchitem){

        let sql1 = "select COUNT(*)AS Total from tbl_leave where reqid LIKE ? OR user_empid LIKE ?"
        result1 = await mysqlcon(sql1, [searchitem + "%", searchitem + "%"])
        let sql = "select tbl_leave.*,DATE_FORMAT(fromdate,'%d-%m-%Y') AS fromdate,DATE_FORMAT(todate,'%d-%m-%Y') AS todate,DATE_FORMAT(requesteddate,'%d-%m-%Y') AS requesteddate from tbl_leave where reqid LIKE ? OR user_empid LIKE ?"
        result = await mysqlcon(sql, [searchitem + "%", searchitem + "%"])


      }else{
        let sql1 = "select COUNT(*)AS Total from tbl_leave"
        result1 = await mysqlcon(sql1)
        let sql = "select tbl_leave.*,DATE_FORMAT(fromdate,'%d-%m-%Y') AS fromdate,DATE_FORMAT(todate,'%d-%m-%Y') AS todate,DATE_FORMAT(requesteddate,'%d-%m-%Y') AS requesteddate from tbl_leave"
         result = await mysqlcon(sql)

      }
      
      let total = result1[0].Total;
      let numOfPages = Math.ceil(total / limit);
      
      let startRange = start + 1;
      let endRange = start + result.length;

   

      return res.status(200).json({
        message: total > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
        Status: "success",
        currentPage: page,
        totalPage: numOfPages,
        data: result
      })

    } catch (err) {
      return res.status(500).json({
        message: err

      })
    }

  },
  module.exports.updateleave = async (req, res) => {
    try {

      let { requestedid, status } = req.body
      let result, sql
      if (status == 1) {
        sql = "update tbl_leave set status='1' where reqid=?"
      } else {
        sql = "update tbl_leave set status='3' where reqid=?"
      }
      result = await mysqlcon(sql, [requestedid])
      if(result.affectedRows>0)
      {
        return res.send(200,{message:"data updated successfully"})
      }else
      {
        return res.send(201,{message:"data not found"})
      }



    } catch (err) {
      return res.status(500).join({ message: err })
    }

  }