const mysqlcon = require("../config/db_connection");

let pagination = (total, page) => {
  let limit = 10;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

  module.exports.leaveDefaultData = async (req, res) => {
    let user = req.user;
    let {id} = req.body;

    try {
      if(id){
        const employeeIdArray = id
        let sql1 ="SELECT Count(*) as count FROM tbl_leave WHERE e_id IN (?)";
        let result = await mysqlcon(sql1, employeeIdArray);
        
         let total = result[0].count;
        

        let Page = req.body.page ? Number(req.body.page) : 1;
        let page = pagination(total, Page);
        
          let sql ="SELECT * from tbl_leave where e_id =?";
          let data = await mysqlcon(sql, [employeeIdArray]);
        

        let startRange = (Page - 1) * page.limit + 1;
        let endRange = Math.min(Page * page.limit, total);

        if(data.length === 0) {
          return res.json(200, {
            message: `Showing ${data.length} from ${data.length}`,
            currentPage: Page,
            totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
            data: data,
          });
        } else {
            return res.json(200, {
              message: `Showing ${startRange} to ${endRange} data from ${total}`,
              currentPage: Page,
              totalPage: page.numOfPages === 0 ? (page.numOfPages = 1) : page.numOfPages,
              data: data,
            });
          }
        } else {
        let sql1 ="SELECT Count(*) as count FROM  tbl_leave WHERE e_id IN (?)";
        let result = await mysqlcon(sql1, user.id);

        
        let total = result[0].count;
        

        let Page = req.body.page ? Number(req.body.page) : 1;
        let page = pagination(total, Page);

          let sql ="SELECT * from tbl_leave where e_id =? ORDER BY id DESC";
         let data = await mysqlcon(sql, [user.id, page.start, page.limit]);
        
        let startRange = (Page - 1) * page.limit + 1;
        let endRange = Math.min(Page * page.limit, total);

        if(data.length === 0) {
          return res.json(200, {
            message: `Showing ${data.length} from ${data.length}`,
            currentPage: Page,
            totalPage: page.numOfPages,
            data: data,
          });
        } else {
            return res.json(200, {
              message: `Showing ${startRange} to ${endRange} data from ${total}`,
              currentPage: Page,
              totalPage: page.numOfPages,
              data: data,
            });  
        }
      }
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occur",
        error,
      });
    }
  }
  
  module.exports.leaveRequested = async (req, res) => {
    try {
    let user = req.user;
    let { requestedId, leaveType, fromDate, toDate, reason } = req.body;
 
    let sqlEmpId="SELECT empid FROM tbl_emp WHERE id = ?"
    let resultEmpId = await mysqlcon(sqlEmpId,[user.id])
    let empid = resultEmpId[0].empid
    
    console.log("accountN--=",fromDate);
    console.log("bankName--=",toDate);

    const from_Date = new Date(fromDate);
    console.log("fromdateeeeeeeeee",from_Date);
const to_Date = new Date(toDate);
console.log("todateeeeeeeeee",to_Date);


// Calculate the difference in milliseconds
const differenceMs = to_Date - from_Date;
console.log("differenceMs---",differenceMs);
// Convert milliseconds to days
const oneDayMs = 1000 * 60 * 60 * 24;
const differenceDays = Math.floor(differenceMs / oneDayMs) + 1;
console.log("fggfrom", differenceDays);

    let reqLeave = {
      e_id: user.id, 
      reqid: requestedId,
      status : 2,
      leavetype: leaveType,
      fromdate: from_Date,
      todate: to_Date,
      reason:reason,
      user_empid : empid,
      totalleavecount: differenceDays
      
    };
    let sql2 = "INSERT INTO tbl_leave SET ?, requesteddate = NOW()";
    let result = await mysqlcon(sql2, reqLeave);
    let type = reqLeave.leavetype;
    let leave = 0;
    if(type=='sick leave'){
     
      let updateSQL  = "UPDATE tbl_emp SET sickleave = ? where id = ?";
      let walletResult = await mysqlcon(updateSQL, [leave, user.id]);
    }else{
      let updateSQL  = "UPDATE tbl_emp SET casualleave = ? where id = ?";
      let walletResult = await mysqlcon(updateSQL, [leave, user.id]);
    }
    
    if(result.affectedRows > 0){
      return res.status(200).json({
          message: "Request for New Leave Successfully Applied",
          data: result,
        });
    }else{
      return res.json(201,{
          message: "Error While Creating",
          data:result
      })
  }
  
  
  
    } catch (error) {
    console.log(error)
    return res.json(500,{
      message: "error occurered",
      error: error
    })
  
  }
  }
  
  module.exports.leaveCardDetails = async (req, res) => {
    let user = req.user;
    let {id} = req.body;
    try {
      if(id){
        
        let defaultSql = "SELECT leaves as Total,sickleave as sTotal,casualleave as cTotal FROM tbl_emp WHERE id IN (?)";
       
        let result1 = await mysqlcon(
          defaultSql,[id]
        );

        if (result1.length === 0) {
          return res.json(201, {
            data: [
              {
                name: "Total Leaves",
                amount: 0,
              },
              {
                name: "Sick Leaves",
                amount: 0,
              },
              {
                name: "Casual Leaves",
                amount: 0,
              },
              {
                name: "Taken Leaves",
                amount: 0,
              },
            ],
          });
        } else {
          return res.json(200, {
            data: [
              {
                name: "Total olLeaves",
                amount: result1[0].Total,
              },
              {
                name: "Sick Leaves",
                amount: result1[0].sTotal,
              },
              {
                name: "Casual Leaves",
                amount: result1[0].cTotal,
              },
              {
                name: "Taken Leaves",
                amount: parseInt(result1[0].Total) - (parseInt(result1[0].sTotal) + parseInt(result1[0].cTotal)),
              },
            ],
          });
        }
      } else {
      let defaultSql = "SELECT leaves as Total,sickleave as sTotal,casualleave as cTotal FROM tbl_emp WHERE id IN (?)";
      let result1 = await mysqlcon(defaultSql,[user.id]);
      if (result1.length === 0) {
        return res.json(201, {
          data: [
            {
              name: "Total Leaves",
              amount: 0,
            },
            {
              name: "Sick Leaves",
              amount: 0,
            },
            {
              name: "Casual Leaves",
              amount: 0,
            },
            {
              name: "Taken Leaves",
              amount: 0,
            },
          ],
        });
      } else {
        return res.json(200, {
          data: [
            {
              name: "Total Leaves",
              amount: result1[0].Total,
            },
            {
              name: "Sick Leaves",
              amount: result1[0].sTotal,
            },
            {
              name: "Casual Leaves",
              amount: result1[0].cTotal,
            },
            {
              name: "Taken Leaves",
              amount: parseInt(result1[0].Total) - (parseInt(result1[0].sTotal) + parseInt(result1[0].cTotal)),
            },
          ],
        });
      }
      }
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occured",
        error: error,
      });
    }
  }

  module.exports.leaveUserEmpId = async(req, res) => {
    try {
      let user = req.user;
      let {id} = req.body;
      if(id)
      {
        let sql = "SELECT empid FROM tbl_emp where id = ?";
        let result = await mysqlcon(sql, [id]);
        console.log("empidndj", result[0].empid);
        let data= result;
        if(result.length !== 0){
          return res.json(200,{
            message: `Data`,
            data:data,
            
          })
        } else {
          return res.json(201,{
            message: "Not data Found",
            data:result
          })
        }
      }
      else
      {
        let sql = "SELECT empid FROM tbl_emp where id = ?";
        let result = await mysqlcon(sql, [user.id]);
       

        let data= result;
        if(result.length !== 0)
        {
          return res.json(200,{
          message: `Data`,
          data:data,
          
        })
        }else 
        {
          return res.json(201,{
          message: "Not data Found",
          data:result
          })
        }
      }
      
    } catch (error) {
      console.log(error)
      return res.json(500,{
        message: "error occurered",
        error: error
      })
    }
  }
  