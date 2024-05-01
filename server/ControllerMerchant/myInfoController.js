let mysqlcon = require("../config/db_connection")
module.exports.defaultInfo = async (req,res) => {
    try {
        const { id } = req.user;
        console.log(id)
        const { tab } = req.body;
        // const {token} = req.body;
        // console.log(token)
        switch (tab) {
          case "1": {
            const sql ="SELECT * FROM tbl_emp WHERE id = ?";
            
            const result = await mysqlcon(sql, [id]);
         
            res.status(200).json({
              success: true,
              message: "Employee Profile",
              result: result[0]
            });
            break;
          }case "2": {
            const sql ="SELECT device ,ipaddress FROM tbl_emp WHERE id = ?";
            const result = await mysqlcon(sql, [id]);
            res.status(200).json({
              success: true,
              message: "Business Info",
              result: result[0],
            });
            break;
          } 
         
          default:
            res.status(400).json({
              success: false,
              message: "somthing went wrong",
            });
            break;
        }
      } catch (err) {
        console.log(err)
        res.status(500).json({
          sussess: false,
          message: err,
        });
      }
}
module.exports.downloadInfo = async (req,res) => {
    let user = req.user;
    try {
    let defaultSql = "SELECT name, fname, lname, email, empid, id, secretkey, gender, casualleave, sickleave, leaves, team, device, ipaddress, created_on, phone from tbl_emp WHERE id = ?";
    
    const defaultResult = await mysqlcon(defaultSql, [user.id]);
  
    res.status(200).json({
      default: defaultResult,
      // countryResult: country_method
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Somthing went wrong in reports",
    });
  }
}
module.exports.updateInfo = async (req,res) => {
    let user = req.user;
    try {
      var request = req.body;
      
      if (request) {
        var validate_req = [
          "emp_name",
          "emp_employeeid",
          "emp_secretkey",
          "emp_gender",
          "emp_team",
          "emp_leaves",
          "emp_emailaddress",
        ];
        var req_str = "";
        var req_arr = [];
        for (const key in validate_req) {
          
          if (!request[validate_req[key]]) {
            req_str += "<p>" + validate_req[key] + " is required </p>";
            req_arr.push(validate_req[key]);
          }
        }

        if (req_arr.length > 0) {
          
          res
            .status(201)
            .json({ status: false, message: req_str, data: req_arr });
          return true;
        }

        var user_id = user.id;
        var company_data = {
          name: request.emp_name,
          empid: request.emp_employeeid,
          secretkey: request.emp_secretkey,
          gender: request.emp_gender,
          team: request.emp_team,
          leaves: request.emp_leaves,
          email: request.emp_emailaddress,
        };

        sql = "UPDATE tbl_emp SET ? WHERE id = ? ";
        let dbquery = await mysqlcon(sql, [company_data, user_id]);
        
        if (dbquery) {
          res
            .status(200)
            .json({ status: true, message: "Saved successfully", data: [] });
        }
      } else {
        res.status(201).json({
          status: false,
          message: "All company profile data are required",
          data: [],
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", data: [] });
    } 
}
