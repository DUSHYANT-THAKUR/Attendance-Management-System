let mysqlcon = require("../config/db_connection")
module.exports.defaultChat = async (req,res) => {
    try {

    } catch {
        return res.status(500).json(
            {
                message : "Internal Server Error"
            }
        )
    }
}