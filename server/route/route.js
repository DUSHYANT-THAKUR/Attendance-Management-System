const dashboardController = require('../Controller/dashboardController')
const loginController = require("../Controller/loginController");
const employeeOnboarding = require("../Controller/employeeOnboarding");
const employeeAttendanceController = require("../Controller/employeeAttendanceController")
const contactController = require("../Controller/contactController");
const changePasswordController = require("../Controller/changePassController");
const leaveController = require("../Controller/leaveController")
const holidayController = require("../Controller/holidaysController")

const route = require("express").Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    let imgname = new Date().toString();
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.extname(file.originalname);
    let image = `${imgname}${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });
const helper = require("../helper/jwt");



// Login Controller
route.post("/login", uploads.none(), loginController.login);
route.post(
  "/modulePesmission",
  uploads.none(),
  loginController.modulePesmission
);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌

// dashboardController
route.post('/onTimeOnLateFilter',uploads.none(),helper.verify,dashboardController.onTimeOnLateFilter)
route.post("/UpcomingBirthday",uploads.none(),helper.verify,dashboardController.UpcomingBirthday)
route.post("/employeeTotalAbsentPresentWeek",uploads.none(),helper.verify,dashboardController.employeeTotalAbsentPresentWeek)
route.post("/totalPresentAbsentWeek",uploads.none(),helper.verify,dashboardController.totalPresentAbsentWeek)
route.post("/viewNotification",uploads.none(),helper.verify,dashboardController.viewNotification)
route.post("/setViewNotificationStatus",uploads.none(),helper.verify,dashboardController.setViewNotificationStatus)
route.post("/countNotification",uploads.none(),helper.verify,dashboardController.countNotification)
// Employee Onboarding
route.post(
  "/viewDetails",
  uploads.none(),
  helper.verify,
  employeeOnboarding.viewDetails
);
route.post(
  "/changestatusemployee",
  uploads.none(),
  helper.verify,
  employeeOnboarding.changestatusemployee
);
route.post("/createNewEmployee",uploads.none(),helper.verify,employeeOnboarding.createNewEmployee)

// Employee Attendance Api
route.post("/defaultEmployeeAttendance",uploads.none(),helper.verify,employeeAttendanceController.defaultEmployeeAttendance)
route.post("/absentDataEntry",uploads.none(),helper.verify,employeeAttendanceController.absentDataEntry)
route.post("/downloadEmployeeAttendance",uploads.none(),helper.verify,employeeAttendanceController.downloadEmployeeAttendance)
// Leave 
route.post("/leaveDetails",uploads.none(),helper.verify,leaveController.leaveDetails)
route.post("/updateleave",uploads.none(),helper.verify,leaveController.updateleave)

// Holiday Api
route.post("/allHolidays",uploads.none(),helper.verify,holidayController.allHolidays)
route.post("/createHoliday",uploads.none(),helper.verify,holidayController.createHoliday)
// change Password
route.post(
  "/changePassword",
  uploads.none(),
  helper.verify,
  changePasswordController.changePassword
);

//Contact Controller
route.post(
  "/contact",
  uploads.none(),
  helper.verify,
  contactController.Contact
);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌

module.exports = route;
