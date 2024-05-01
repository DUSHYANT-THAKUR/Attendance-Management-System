let mysqlcon = require("../config/db_connection")
module.exports.createContact = async (req,res) => {
    try {
         let {name,email,message} = req.body;
         console.log(req.body)
         let date = new Date();
         let details = {
            name,
            email,
            message,
            created_on:date
         }
         let sql = "INSERT INTO tbl_notification SET ?";
         let result = await mysqlcon(sql,[details]);
         return res.status(200).json(
            {
                message : "Inserted Successfully"
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