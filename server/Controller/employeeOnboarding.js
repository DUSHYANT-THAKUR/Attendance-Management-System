const mysqlcon = require("../config/db_connection");

module.exports.changestatusemployee = async (req, res) => {
  const { id } = req.body;
  let result;
  try {
    let sql1 = "SELECT status FROM tbl_emp WHERE id=?";
    let result1 = await mysqlcon(sql1, [id]);

    if (result1.length > 0) {
      let newStatus = result1[0].status === 0 ? 1 : 0;
      let sql = "UPDATE tbl_emp SET status=? WHERE id=?";
      result = await mysqlcon(sql, [newStatus, id]);

      return res.status(200).json({ message: "Status updated successfully" });
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating status" });
  }
};
module.exports.createNewEmployee = async function (req, res) {
  try {
    let { name, email, empid, gender, dob, doj, team, nationality, device, ipaddress } = req.body;

    function validateFields() {  
      if (!name || !email || !empid || !gender || !dob || !doj ||!team ||!nationality ||!device ||!ipaddress) {
          return "All fields are required";
      }if (!/^[a-zA-Z\s]+$/.test(name)) {
        return "name must contain only alphabetic characters and spaces";
    }
      if (!/\S+@\S+\.\S+/.test(email)) {
          return "Please enter a valid email address";
      }
      if (!/^[0-9.]+$/.test(ipaddress)) {
          return "Input must contain only numbers and periods.";
      }
      return null;
  }
  const validationMessage = validateFields();
  if (validationMessage) {
      return res.status(201).json({ message: validationMessage });
  }

    let details = {
      name,
      email,
      empid,
      gender,
      dob,
      doj,
      team,
      nationality,
      device,
      ipaddress  
    };

    let sql = "INSERT INTO tbl_emp SET ?";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "New Employee Created✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
module.exports.viewDetails = async (req, res) => {
  try {
    const { searchitem } = req.body;
    let result, result1;
    let page = req.body.page ? Number(req.body.page) : 1;

    let limit = 10;
    let start = page * limit - limit;

    if (searchitem) {
      let sql1 =
        "select  COUNT(*) AS Total from tbl_emp where team LIKE ? OR empid LIKE ?";
      result1 = await mysqlcon(sql1, [searchitem + "%", searchitem + "%"]);
      let sql = "select DATE_FORMAT(created_on,'%d-%m-%Y') AS created_on, * from tbl_emp where team LIKE ? OR empid LIKE ? ORDER BY created_on DESC LIMIT ?,?";
      result = await mysqlcon(sql, [searchitem + "%", searchitem + "%",start,limit]);
    } else {
      let sql1 = "select COUNT(*) AS Total from tbl_emp ";
      result1 = await mysqlcon(sql1);
      let sql = "select * from tbl_emp ORDER BY created_on DESC LIMIT ?,?";
      result = await mysqlcon(sql,[start,limit]);
    }

    let total = result1[0].Total;
    let numOfPages = Math.ceil(total / limit);

    let startRange = start + 1;
    let endRange = start + result.length;

    return res.status(200).send({
      message:
        total > 0
          ? `Showing ${startRange} to ${endRange} data from ${total}`
          : "NO DATA",
      Status: "success",
      currentPage: page,
      totalPage: numOfPages,
      data: result,
    });
  } catch (error) {
    return res
      .status(201)
      .json({ status: false, message: "Some error occured", data: [] });
  }
};