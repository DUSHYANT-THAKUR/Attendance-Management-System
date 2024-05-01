import React, { useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useStateContext } from "../../context/ContextProvider";
//Api Helper
import baseUrl from "../../componentsAdmin/config/baseUrl";
import axios from "axios";

//Admin Dashboard
import Login from "../Login/Login";
import Sidebar from "../Sidebar/Sidebar";
import AdminDashboard from "../DASHBOARD/Dashboard";
import EmployeeOnboarding from "../EmployeeOnboarding/EmployeeOnboarding";
import EmployeeAttendance from "../EmployeeAttendance/EmployeeAttendance";
import AdminReport from "../EmployeeAttendance/Reports/Report"
import AdminLeave from "../AdminLeave/AdminLeave";
import AdminHoliday from "../Holiday/Holiday"
import AdminChatWithUs from "../AdminChat/ChatWithUs";
import AdminChangePassword from "../ChangePassword/ChangePassword";




// employees Dashboard //
 import Dashbord from "../../componentsEmployees/DASHBOARD/Dashboard";
 import Myinfo from "../../componentsEmployees/MYINFO/Myinfo";
 import Leave from "../../componentsEmployees/LEAVE/Leave";
 import MerchantSidebar from "../../componentsEmployees/SIDEBAR/Sidebar";
 import Report from "../../componentsEmployees/REPORTS/Report";
  import InCompleteProfile from "../../componentsEmployees/SIGNUPANDLOGIN/InCompleteProfile";
   import MerchantLogin from "../../componentsEmployees/SIGNUPANDLOGIN/Login";
   import SignUp from "../../componentsEmployees/SIGNUPANDLOGIN/SignUp";
  import Forget from "../../componentsEmployees/SIGNUPANDLOGIN/Forget";
  import NewPassword from "../../componentsEmployees/SIGNUPANDLOGIN/NewPassword";
  import  DownloadInfo  from "../../componentsEmployees/MYINFO/DowloadInfo";
  import RequestLeave from "../../componentsEmployees/LEAVE/RequestLeave";
  import EmployeeChangePassword from "../../componentsEmployees/CHANGEPASSWORD/ChangePass";
  import EmployeeChatWithUs from "../../componentsEmployees/CHAT/Chating"
  import EmployeeHoliday from "../../componentsEmployees/EMPLOYEEHOLIDAYS/EmployeeHolidays"
  import LearnMore from "../../componentsEmployees/LEARNMORE/LearnMore";
  import Contact from "../../componentsEmployees/CONTACT/Contact";

//<><><><><><><><><><><><><><><>🤓Settlement Dashboard End🤓<><><><><><><><><><><><><>
function Routers() {
  const { isLoginUser,setIsLoginUser,role, setRole, setAccoutType,accoutType } = useStateContext();
  const location = useLocation();
  const reactNavigate = useNavigate()
  useLayoutEffect(() => {
   if(localStorage.getItem('admin')){
      const { exp } = jwtDecode(localStorage.getItem('admin'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear(); 
        reactNavigate('/bankconnect')
        return;
      }
      setIsLoginUser(localStorage.getItem('admin'))
      setRole(localStorage.getItem('role'))
    } else if(localStorage.getItem('user')){
      const { exp } = jwtDecode(localStorage.getItem('user'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear(); 
        reactNavigate('/bankconnect/employees/login-merchant')
        return;
      }
      setIsLoginUser(localStorage.getItem('user')) 
      setAccoutType(localStorage.getItem('accoutType')) 
    }
  }, [location.pathname,isLoginUser,role]);

  return (
    <Routes>
      {isLoginUser && role === "-1" ? (
        <Route path="/" element={<Sidebar />}>
          <Route path="/bankconnect/Dashboard" element={<AdminDashboard />} />
          <Route path = "/bankconnect/EmployeeOnboarding" element ={< EmployeeOnboarding />} />
          <Route path="/bankconnect/EmployeeAttendance" element = {<EmployeeAttendance />} />
          <Route path="/bankconnect/Report/:user_id/:name" element = {<AdminReport />} />
          <Route path = "/bankconnect/AdminLeave" element ={< AdminLeave />} />
          <Route path = "/bankconnect/Holiday" element ={< AdminHoliday />} />
          <Route path="/bankconnect/AdminChatWithUs" element = {<AdminChatWithUs />} />
         <Route path = "/bankconnect/AdminChangePassword" element ={<AdminChangePassword />} />
        </Route>
      ) : (
        <Route path="/bankconnect" element={<Login />} />
      )}
      <Route>
        {isLoginUser ? (
          <>
            <Route path="/bankconnect/employee" element={<MerchantSidebar />}>
              <Route path="dashboard" element={<Dashbord />} />
              <Route path="Myinfo" element={<Myinfo />} />
              <Route path="Leave" element={<Leave />} />
              <Route path="Report" element={<Report />} />
              <Route path="ChangePassword" element={<EmployeeChangePassword />} />
              <Route path="DownloadInfo" element={<DownloadInfo />} />
              <Route path="Leave/RequestLeave" element = {<RequestLeave />} />
              <Route path="Holiday" element = {<EmployeeHoliday />} />
              <Route path="EmployeeeChatWithUs" element = {<EmployeeChatWithUs />} />
            </Route>
          </>
        ) : (
          <>
            <Route
              path="/bankconnect/employee/login-employee"
              element={<MerchantLogin />}
            />
            <Route path="/bankconnect/signup-employee" element={<SignUp />} />
            <Route path="/bankconnect/employee/InCompleteProfile/:key" element={<InCompleteProfile />} />
            <Route path="/bankconnect/forgot-password" element={<Forget />} />
            <Route path="/bankconnect/employee/NewPassword" element={<NewPassword />} />
            <Route path="/bankconnect/employee/LearnMore" element={<LearnMore />} />
            <Route path="/bankconnect/employee/Contact" element={<Contact />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default Routers;
