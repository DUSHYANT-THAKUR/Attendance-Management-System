import React from 'react'
import './Sidebar.css';
import logo from './bankconnect.6939ad8ad77f7b4fbcd4.png'
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const Sidebar = () => {
    const navigate = useNavigate();
    const { setIsLoginUser } = useStateContext();
    const LoggedOut = () => {
        localStorage.clear("user");
        localStorage.clear("role");
        setIsLoginUser(undefined);
        navigate("/");
      }
    const SidebarData =[
        {
            title:'Dashboard',
            icon:<HomeIcon/>,
            link:'/bankconnect/employee/dashboard'
        },
        {
            title:'Notifications',
            icon:<NotificationsIcon/>,
            link:'/bankconnect/employee/notifications'
        },
        {
            title:'Attendance',
            icon:<AssignmentIcon/>,
            link:'/bankconnect/employee/Attendance'
        },
        {
            title:'Performance',
            icon:<AssignmentIcon/>,
            link:'/bankconnect/employee/Performanaces'
        },
        {
            title:'My Calender',
            icon:<CalendarMonthIcon/>,
            link:'/bankconnect/employee/my-calender'
        },
        {
            title:'Library',
            icon:<LibraryBooksIcon/>,
            link:'/library'
        },
        {
            title:'Training',
            icon:<ModelTrainingIcon/>,
            link:'/training'
        },
        {
            title:'Employees',
            icon:<GroupsIcon/>,
            link:'/bankconnect/employee/Employee'
        }
    ]
    const SidebarSettingData =[
        {
            title:'Setting',
            icon:<SettingsIcon/>,
            link:'/setting'
        },
        {
            title:'Edit Profile',
            icon:<SettingsIcon/>,
            link:'/edit-profile'
        },
        {
            title:'Change Password',
            icon:<HelpCenterIcon/>,
            link:'https://dushyant-prashun-thakur.netlify.app/bankconnect/employee/ChangePassword'
        },
        {
            title:'LogOut',
            icon:<LogoutIcon/>,
            action:LoggedOut
        },
    
    ]
  return (
    <div className='sidebar'>
       <div className='logo'>
       <img src={logo} id='logo'/>
       </div>
        <ul className='sidebarList'>
            {SidebarData.map((val, key)=>{
                return(
                    <li key={key}
                    id={window.location.pathname == val.link ? "active": ""}
                     onClick={()=>{window.location.pathname = val.link}}
                     className='sidebar-content'>
                        {""}
                        <div id='icon'>{val.icon}</div>{""}
                        <div id='title'>{val.title}</div>
                    </li>
                )
            })}
            <hr/>
            <h4 className='sidebar-setting'>SETTING</h4>
            {SidebarSettingData.map((val, key)=>{
                return(
                    <li key={key}
                    id={window.location.pathname == val.link ? "active": ""}
                     onClick={val.action ? val.action : ()=>{window.location.pathname = val.link}}
                     className='sidebar-content'>
                        {""}
                        <div id='icon'>{val.icon}</div>{""}
                        <div id='title'>{val.title}</div>
                    </li>
                )
            })}
            
        </ul>
    </div>
  )
}

export default Sidebar