import React, { useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import MenuIcon from '@mui/icons-material/Menu';
import { useStateContext } from "../../context/ContextProvider";
import { jwtDecode } from "jwt-decode";

// Employee Dashboard
import Login from "../../ComponentEmployee/Login/Login";
import Dashboard from "../../ComponentEmployee/Dashboard/Dashboard";
import Attendance from "../Attendance/Attendance";
import Performanaces from "../Performances/Performances";
import Notifications from "../Notifications/Notifications";
import MyCalendar from "../MyCalendar/Calendar";
import Employee from "../Employee/Employee"
import ChangePassword from "../ChangePassword/ChangePassword";

// Admin Dashboard

function Routers() {
  
  const { isLoginUser, setIsLoginUser, role, setRole } = useStateContext();
  const location = useLocation();
  const path = location.pathname;
  const reactNavigate = useNavigate()

  // useLayoutEffect(() => {
  //   if (localStorage.getItem('admin')) {
  //     const { exp } = jwtDecode(localStorage.getItem('admin'))
  //     const expirationTime = (exp * 1000) - 60000
  //     if (Date.now() >= expirationTime) {
  //       localStorage.clear();
  //       reactNavigate('/bankconnect')
  //       return;
  //     }
  //     setIsLoginUser(localStorage.getItem('admin'))
  //     setRole(localStorage.getItem('role'))
  //   } else if (localStorage.getItem('user')) {
  //     const { exp } = jwtDecode(localStorage.getItem('user'))
  //     const expirationTime = (exp * 1000) - 60000
  //     if (Date.now() >= expirationTime) {
  //       localStorage.clear();
  //       reactNavigate('/bankconnect/employee/login-employee')
  //       return;
  //     }
  //     setIsLoginUser(localStorage.getItem('user'))
  //   }
  // }, [path, isLoginUser, role]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
    
       
        <div className="Router-file d-flex">
          <div className="menu-icon" onClick={toggleSidebar}>
            <MenuIcon className="fs-1" />
          </div>
          <div className={`sidebar-comp ${isSidebarVisible ? "visible" : ""}`}>
            <Sidebar />
          </div>
          <div className="w-100">
            <Header />
            <Routes>
              <Route path="/bankconnect/employee/dashboard" element={<Dashboard />} />
              <Route path="/bankconnect/employee/notifications" element={<Notifications />} />
              <Route path="/bankconnect/employee/Attendance" element={<Attendance />} />
              <Route path="/bankconnect/employee/Performanaces" element={<Performanaces />} />
              <Route path="/bankconnect/employee/my-calender" element={<MyCalendar />} />
              <Route path="/bankconnect/employee/ChangePassword" element={<ChangePassword />} />
              <Route path="/bankconnect/employee/Employee" element={<Employee />} />
              <Route path="/bankconnect/employee/login-employee" element={<Login />} />
          <Route path="/" element={<Navigate to="/bankconnect/employee/login-employee" />} />
          <Route path="/bankconnect" element={<Login />} />
            </Routes>
          </div>
        </div>
    </>
  );
}

export default Routers;
