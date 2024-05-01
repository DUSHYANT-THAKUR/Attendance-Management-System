const loginController = require("../ControllerMerchant/loginController.js");
const myInfoController = require("../ControllerMerchant/myInfoController")
const reportController = require("../ControllerMerchant/reportController")
const dashboardController = require("../ControllerMerchant/dashboardController")
const leaveController = require("../ControllerMerchant/leaveController")
const holidayController = require("../ControllerMerchant/holidayController")
const changePasswordController = require("../ControllerMerchant/changePassController")
let contactController = require("../ControllerMerchant/ContactUs")

const authMiddleware = require('../middleware/authMiddleware')
const route = require("express").Router();
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../Public/EmployeeProfile"));
  },
  filename: function (req, file, cb) {
    let imgname = file.originalname;
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.basename(imgname);
    let image = `${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });
const username = require("../helper/username");
// const email_validate = require("../helper/email-validation");

const views = path.join(__dirname, "../views/");

// routes
route.get("/", (req, res) => {
  console.log(views);
  res.sendFile(views + "index.html");
});

// SignUp and Login Api Route
route.post("/register", uploads.none(), loginController.register);
route.post("/login-employees",uploads.none(),loginController.login)
route.post("/profileImagePath",uploads.none(),authMiddleware,loginController.profileImagePath)
route.post("/updateProfile",uploads.single("image"),authMiddleware,loginController.updateProfile)
route.post("/SystemDetails",uploads.none(),authMiddleware,loginController.SystemDetails)
route.post("/tokenMail",uploads.none(),loginController.tokenMail)
route.post("/forgotPassword",uploads.none(),loginController.forgotPassword)
// route.post("/uploadProfileImg",uploads.single("image"),authMiddleware,loginController.uploadProfileImg);

// dashboard Api Route
route.post("/todayData",uploads.none(),authMiddleware,dashboardController.todayData)
route.post("/YesterdayData",uploads.none(),authMiddleware,dashboardController.YesterdayData)
route.post("/WeeklyData",uploads.none(),authMiddleware,dashboardController.WeeklyData)
route.post('/MonthlyData',uploads.none(),authMiddleware,dashboardController.MonthlyData)
route.post('/BirthdayCard',uploads.none(),authMiddleware,dashboardController.BirthdayCard)
route.post("/GraphWeekData",uploads.none(),authMiddleware,dashboardController.GraphWeekData)
route.post("/EmployeeThisWeekPunchInPunchOut",uploads.none(),authMiddleware,dashboardController.EmployeeThisWeekPunchInPunchOut)
// MyInfo Api Route
route.post("/defaultInfo",uploads.none(),authMiddleware,myInfoController.defaultInfo)
route.post("/updateInfo",uploads.none(),authMiddleware,myInfoController.updateInfo)
route.post("/downloadInfo",uploads.none(),authMiddleware,myInfoController.downloadInfo)

// Report Api Route 
route.post("/defaultReport",uploads.none(),authMiddleware,reportController.defaultReport)
route.post("/createReport",uploads.none(),authMiddleware,reportController.createReport)
route.post("/reportCard",uploads.none(),authMiddleware,reportController.reportCard)
route.post("/punchoutReport",uploads.none(),authMiddleware,reportController.punchoutReport)
route.post("/downloadReport",uploads.none(),authMiddleware,reportController.downloadReport)

// Leave Api Route
route.post("/leaveDefaultData",uploads.none(),authMiddleware,leaveController.leaveDefaultData);
route.post("/leaveRequested",uploads.none(),authMiddleware,leaveController.leaveRequested);
route.post("/leaveCardDetails",uploads.none(),authMiddleware,leaveController.leaveCardDetails);
route.post("/leaveUserEmpId",uploads.none(),authMiddleware,leaveController.leaveUserEmpId);

// Holiday Api
route.post("/allHolidays",uploads.none(),authMiddleware,holidayController.allHolidays)
// ChangePassword Api Route
route.post("/changePassword-employees",uploads.none(),authMiddleware,changePasswordController.changePassword)
//Contact Api
route.post("/createContact",uploads.none(),contactController.createContact)

module.exports = route;

