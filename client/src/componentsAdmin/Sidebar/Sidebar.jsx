import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import logo from "./imgs/adminlogo.svg";
import quickprevious from "./imgs/quick-previous.svg";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


// Sidebar Icons
import dashboard from "./imgs/dashboard.svg";
import EmployeeOnboarding from "./imgs/EmployeeOnboarding.svg";
import Leave from "./imgs/leave.png"
import Chat from "./imgs/chat.png";
import report from "./imgs/report.png"
import merinfo from "./imgs/merinfo.svg";
import Logout from "./imgs/logout.svg";
import settingbar from "./imgs/settingbar.svg";
import Holiday from "./imgs/Holiday.png"
import axios from "axios";
import baseUrl from "../config/baseUrl";

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `100%`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const { active, setActive, toggel, setToggel, setIsLoginUser, isLoginUser, role } =
    useStateContext();
  const navigate = useNavigate();


  const userTokenExp = () => {
    if (localStorage.getItem("admin")) {
    } else {
      setIsLoginUser(!isLoginUser);
      navigate("/bankconnect");
    }
  };
  userTokenExp();

  const logout = () => {
    localStorage.clear("admin");
    localStorage.clear("role");
    setIsLoginUser(undefined);
    navigate("/bankconnect");
  };

  const [openModel, setOpenModel] = useState(false);
  const [notifications,setNotifications] = useState([]);
  const [count,setCount] = useState("");
  
  async function notification() {
    let auth = localStorage.getItem("admin")
    try {
  let config = {
    headers:{
      "Content-type" : "application/json",
      accept : "application/json",
      Authorization : `Bearer ${auth}`
    }
  }
  let result = await axios.post(`${baseUrl}/viewNotification`,{},config)
  console.log(result.data)
  setNotifications(result.data.result)
    } catch (error) {
      console.log(error)
    }
  }
  async function countNotificatons() {
    let auth = localStorage.getItem("admin")
    try {
  let config = {
    headers:{
      "Content-type" : "application/json",
      accept : "application/json",
      Authorization : `Bearer ${auth}`
    }
  }
  let result = await axios.post(`${baseUrl}/countNotification`,{},config)
  console.log(result.data.result[0].total)
  setCount(result.data.result[0].total)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickOpen = async() => {
    setOpenModel(true);
    let auth = localStorage.getItem("admin")
  try {
let config = {
  headers:{
    "Content-type" : "application/json",
    accept : "application/json",
    Authorization : `Bearer ${auth}`
  }
}
let result = await axios.post(`${baseUrl}/setViewNotificationStatus`,{},config)
console.log(result)
  } catch(error){
console.log(error)
  }
}
  const handleClose = () => {
    setOpenModel(false);
    countNotificatons();
  };

useEffect(()=>{
notification()
countNotificatons()
},[])
  let sidebarLink;

  if(role === "-1"){
    sidebarLink = [
      {
        name: "Dashboard",
        iconUrl:
          `${dashboard}`,
        path: "/bankconnect/Dashboard",
      },
      {
        name: "Employee Onboarding",
        iconUrl:
          `${EmployeeOnboarding}`,
        path: "/bankconnect/EmployeeOnboarding",
      },
      {
        name: "Employee Attendance",
        iconUrl:
          `${report}`,
        path: "/bankconnect/EmployeeAttendance",
      },
      {
        name: "Leave",
        iconUrl: `${Leave}`,
        path: "/bankconnect/AdminLeave",
      },
      {
        name: "Holiday",
        iconUrl: `${Holiday}`,
        path: "/bankconnect/Holiday",
      },
      {
        name: "Chat With Us",
        iconUrl:
          `${Chat}`,
        path: "/bankconnect/AdminChatWithUs",
      },
      {
        name: "Change Password",
        iconUrl:
          `${merinfo}`,
        path: "/bankconnect/AdminChangePassword",
      },
    ];
  }   

  return (
    <Box sx={{ display: "flex" }} className="parentAll">
      <div
        onClick={() => setOpen(!open)}
        className={open ? "openClose" : "openClose2"}
      >
        <img
          src={quickprevious}
          alt=""
          width="40px"
          style={{ position: "fixed", cursor: "pointer" }}
        />
      </div>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="appBar">
        <Toolbar className="appBarcom">
          <Typography variant="h6" noWrap component="div">
            {open ? (
              <img
                src={logo}
                // src="./imges/adminlogo.svg"
                alt="adminLogo"
                width="200px"
              />
            ) : (
              <img src={logo} alt="adminLogo" width="200px" />
            )}
          </Typography>
          <div className="navLeft m-3">
      <div>
        <button onClick={handleClickOpen}>
        <Badge badgeContent={count} color="primary">
      <NotificationsIcon />
    </Badge>
        </button>
        <Dialog
          open={openModel}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={'md'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              top: '-13%',
              left:"40%", 
              margin: '0',
              borderRadius: '10px',
            },
          }}
          BackdropProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
        >
          {/* <button className="btn btn-outline-primary shadow-none" onClick={handleClose}>
            <CloseIcon />
          </button> */}
          <DialogTitle style={{ fontWeight: '700', fontSize: '15px' }}>Notification</DialogTitle>
          <DialogContent>
  <TableContainer component={Paper} style={{ height: "300px", width: "80%", overflowY: "scroll" }}>
    <Table>
      <TableHead>
        <TableRow>
          <th>Username</th>
          <th>Message</th>
        </TableRow>
      </TableHead>
      <TableBody>
        {notifications.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</DialogContent>
        </Dialog>
      </div>
 <div >
              <img
                src={settingbar}
                alt=""
                width="40px"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {sidebarLink.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex align-items-center">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive || (toggel && active === index)
                        ? "iconcontainer iconActive1 mx-2 my-1"
                        : "iconcontainer mx-1 my-1"
                    }
                  >
                    <img
                      src={item.iconUrl}
                      alt="not found"
                      width="23px"
                      height="23px"
                      className="m-3"
                      onClick={() => {
                        setActive(index);
                        setToggel(!toggel);
                      }}
                    />
                  </NavLink>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                    }
                    onClick={() => {
                      setActive(index);
                      setToggel(!toggel);
                    }}
                  >
                    {item.name}
                  </NavLink>
                </div>
              </div>
            );
          })}
          <div className=" d-flex align-items-center">
            <img
              src={Logout}
              alt="not found"
              width="30px"
              height="30px"
              className="m-3"
              onClick={logout}
              style={{cursor:"pointer"}}
            />
            <div className="linkNAme mx-2" onClick={logout}>
              Logout
            </div>
          </div>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="mainBlockSideBar"
      >
        <DrawerHeader />
        <div className="bdcolor">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}
