let mysqlcon = require("../config/db_connection")

module.exports.todayData = async (req,res) => {
    try {
        let sql = "SELECT Date, First_in, Last_out, Total_in_time FROM report WHERE user_id = ? ORDER BY Date DESC LIMIT 1";
        let result = await mysqlcon(sql,[req.user.id]);
        if (result.length === 0) {
          res.status(404).send('No entries found');
        } else {
          return res.status(200).json(
            {
              result : result
            }
          )
        }
      } catch (error) {
        console.error('Error retrieving last entry: ' + error.stack);
        res.status(500).send('Internal Server Error');
      }
}
module.exports.WeeklyData = async (req, res) => {
  try {
      let user_id = req.user.id;
      let today = new Date(); // Get the current date
      let currentDayOfWeek = today.getDay(); // Get the current day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)
      let previousMonday = new Date(today); // Clone the current date
      previousMonday.setDate(today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)); // Calculate the date of the previous Monday
      // Format the date of the previous Monday as 'YYYY-MM-DD'
      let formattedPreviousMonday = previousMonday.toISOString().slice(0, 10);

      let sql = `SELECT Total_in_time FROM report WHERE user_id = ? AND DATE(created_on) >= ?`;
      let result = await mysqlcon(sql, [user_id, formattedPreviousMonday]); // Execute the query starting from the previous Monday
      
      // Extract the totalInTime from the result
      let totalHours = 0;
      let totalMinutes = 0;
      let totalSeconds = 0;

      // Loop through each result and add up the time components
      result.forEach(entry => {
          if (entry.Total_in_time) {
              let [hours, minutes, seconds] = entry.Total_in_time.split(':').map(Number);
              totalHours += isNaN(hours) ? 0 : hours;
              totalMinutes += isNaN(minutes) ? 0 : minutes;
              totalSeconds += isNaN(seconds) ? 0 : seconds;
          }
      });

      // Adjust minutes and seconds if they exceed 59
      totalMinutes += Math.floor(totalSeconds / 60);
      totalSeconds = totalSeconds % 60;
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;

      let totalTimeInMinutes = totalHours * 60 + totalMinutes + totalSeconds / 60;

      // Calculate the percentage of time worked
      let totalExpectedTimeInMinutes = 42 * 60 + 30; // Convert total expected time to minutes
      let percentage = (totalTimeInMinutes / totalExpectedTimeInMinutes) * 100;
      totalHours = totalHours > 9 ? totalHours : "0"+totalHours;
      totalMinutes = totalMinutes > 9 ? totalMinutes : "0"+totalMinutes;
      totalSeconds = totalSeconds > 9 ? totalSeconds : "0"+ totalSeconds;
      return res.status(200).json({ totalInTime: `${totalHours}:${totalMinutes}:${totalSeconds}`,percentage : percentage });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports.MonthlyData = async (req, res) => {
  try {
    let user_id = req.user.id;
    let today = new Date(); // Get the current date
    let currentMonth = today.getMonth(); // Get the current month (0=January, 1=February, ..., 11=December)
    let currentYear = today.getFullYear(); // Get the current year
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1); // Get the 1st day of the current month

    let formattedFirstDayOfMonth = firstDayOfMonth.toISOString().slice(0, 10); // Format the date as 'YYYY-MM-DD'

    let sql = `SELECT Total_in_time FROM report WHERE user_id = ? AND DATE(created_on) > ?`;
    let result = await mysqlcon(sql, [user_id, formattedFirstDayOfMonth]); // Execute the query starting from the 1st day of the current month

    // Extract the totalInTime from the result
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;

    // Loop through each result and add up the time components
    result.forEach(entry => {
      if (entry.Total_in_time) {
        let [hours, minutes, seconds] = entry.Total_in_time.split(':').map(Number);
        totalHours += isNaN(hours) ? 0 : hours;
        totalMinutes += isNaN(minutes) ? 0 : minutes;
        totalSeconds += isNaN(seconds) ? 0 : seconds;
      }
    });

    // Adjust minutes and seconds if they exceed 59
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    // Calculate the total time in minutes
    let totalTimeInMinutes = totalHours * 60 + totalMinutes + totalSeconds / 60;

    // Calculate the total expected time from current date to 1st day of current month in minutes
    let currentDate = today.getDate();
    let totalExpectedTimeInMinutes = currentDate * 24 * 60; // Assuming 24 hours in a day

    // Calculate the percentage of time worked
    let percentage = (totalTimeInMinutes / totalExpectedTimeInMinutes) * 100;
    totalHours = totalHours > 9 ? totalHours : "0"+totalHours;
    totalMinutes = totalMinutes > 9 ? totalMinutes : "0"+totalMinutes;
    totalSeconds = totalSeconds > 9 ? totalSeconds : "0"+ totalSeconds;
    return res.status(200).json({ totalInTime: `${totalHours}:${totalMinutes}:${totalSeconds}`, progressPercentage: percentage });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports.YesterdayData = async (req,res) => {
  try {
    let id = req.user.id;
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Set the date to yesterday
    
    // Format yesterday's date as 'YYYY-MM-DD'
    let formattedYesterday = yesterday.toISOString().slice(0, 10);

    let sql = "SELECT Total_in_time FROM report WHERE user_id = ? AND DATE(created_on) = ?";
    let result = await mysqlcon(sql, [id, formattedYesterday]);

return res.status(200).json(
  {
    result : result
  }
)
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      {
        message : "Internal Server Error"
      }
    )
  }
}
module.exports.BirthdayCard = async (req,res) => {
  try {
let date = new Date()
let sql = "~SELECT dob,team FROM tbl_emp WHERE Date(dob)>=?"
let result = await mysqlcon(sql,[date])
console.log(result)
return res.status(200).json(
  {
    result : result
  }
)
  } catch (error) {
    console.log(error)
    return res.status(500).json(
      {
        message : "Internal Server Error"
      }
    )
  }
}
module.exports.GraphWeekData = async (req, res) => {
  try {
    let arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let sql1 = "SELECT Day, Status FROM report WHERE user_id = ? AND WEEK(STR_TO_DATE(Date, '%b %d, %Y')) = WEEK(CURDATE()) AND YEAR(STR_TO_DATE(Date, '%b %d, %Y')) = YEAR(CURDATE()) AND WEEKDAY(STR_TO_DATE(Date, '%b %d, %Y')) BETWEEN 0 AND 4 GROUP BY Day ORDER BY Day ASC;";

    let result = await mysqlcon(sql1,[req.user.id]);

    let mergedResult = arr.map(day => {
      let reportData = result.find(data => data.Day === day);
      let shortDay = "";
      if (day === "Monday") {
        shortDay = "Mon";
      } else if (day === "Tuesday") {
        shortDay = "Tue";
      } else if (day === "Wednesday") {
        shortDay = "Wed";
      } else if (day === "Thursday") {
        shortDay = "Thu";
      } else if (day === "Friday") {
        shortDay = "Fri";
      }
      return {
        Day: shortDay,
        Present: reportData && reportData.Status === "Present" ? 1 : 0,
        Absent: reportData && reportData.Status === "Absent" ? 1 : 0
      };
    });

    return res.status(200).json({
      result: mergedResult
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error
    });
  }
};
module.exports.EmployeeThisWeekPunchInPunchOut = async (req,res) => {
  try {
    let sql = "SELECT Day,First_in,Last_out, Status FROM report WHERE user_id = ? AND WEEK(STR_TO_DATE(Date, '%b %d, %Y')) = WEEK(CURDATE()) AND YEAR(STR_TO_DATE(Date, '%b %d, %Y')) = YEAR(CURDATE()) AND WEEKDAY(STR_TO_DATE(Date, '%b %d, %Y')) BETWEEN 0 AND 4 GROUP BY Day ORDER BY created_on ASC";
    let result = await mysqlcon(sql,[req.user.id])
    return res.status(200).json(
      {
        result : result
      }
    )
  } catch (error) {
    console.log(error)
    return res.status(500).json(
      {
        message : "Internal Server Error",
        error : error
      }
    )
  }
}