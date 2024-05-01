let mysqlcon = require("../config/db_connection")

module.exports.allHolidays = async (req, res) => {
    try {
        let date = new Date();
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        let formattedDate = `${year}-${month}-${day}`;

        let sql = `SELECT event_name AS title, DATE_FORMAT(from_date, '%Y-%m-%d') AS start FROM holidays WHERE from_date >= '${formattedDate}'`;
        let result = await mysqlcon(sql);
        
        for (let i = 0; i < result.length; i++) {
            result[i].backgroundColor = "green";
        }

        return res.status(200).json({
            result: result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

module.exports.createHoliday = async (req, res) => {
    try {
        let { event_name, date } = req.body;
        console.log(req.body)
        let details = {
            event_name,
           from_date : date,
        }
        let sql = "INSERT INTO holidays SET ?"
        let result = await mysqlcon(sql, [details])
        return res.status(200).json(
            {
                message: "Inserted Successfully"
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Internal Server Error",
                error: error
            }
        )
    }
}