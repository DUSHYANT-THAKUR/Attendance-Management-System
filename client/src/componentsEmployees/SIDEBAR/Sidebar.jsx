import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import "./sidebar.css";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import quickprevious from "./imgs/quick-previous.svg";
// Sidebar Icons
import dashboard from "./imgs/dashboard.svg";
import Myinfo from "./imgs/Myinfo.svg";
import changepassword from "./imgs/changepassword.svg";
import Logout from "./imgs/logout.svg";
import bankconnect from "./imgs/bankconnect.png";
import Leave from "./imgs/leave.png"
import Chat from "./imgs/chat.png"
import Reports from "./imgs/report.png"
import Holiday from "./imgs/Holiday.png"


const drawerWidth = 240;
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
  const [open, setOpen] = React.useState(true);
  const { setIsLoginUser } = useStateContext();
  const [profileImage, setProfileImage] = useState("")
  const [punchout, setPunchout] = useState(false);

  const auth = localStorage.getItem("user");

  const navigate = useNavigate();


  const logout = () => {
    async function puchoutReport() {
      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };

        let result = await axios.post(
          `${baseUrl}/punchoutReport`,
          {},
          config
        );
      } catch (error) {
        console.log(error);
      }
    }
    puchoutReport();
    localStorage.clear("user");
    setIsLoginUser(undefined);
    navigate("login-employee");
  };
  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl: `${dashboard}`,
      path: "dashboard",
    },
    {
      name: "My Info",
      iconUrl: `${Myinfo}`,
      path: "Myinfo",
    },
    {
      name: "Leave",
      iconUrl: `${Leave}`,
      path: "Leave",
    },
    {
      name: "Holiday",
      iconUrl: `${Holiday}`,
      path: "Holiday",
    },
    {
      name: "Attendance",
      iconUrl: `${Reports}`,
      path: "Report",
    },
    {
      name: "Chat With Us",
      iconUrl: `${Chat}`,
      path: "EmployeeeChatWithUs",
    },
    {
      name: "Change Password",
      iconUrl: `${changepassword}`,
      path: "ChangePassword",
    },
    {
      name: "Logout",
      iconUrl: `${Logout}`,
      path: "login-employee",
    },
  ];
  const fetchProfile = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/profileImagePath`, {}, config);
      console.log("my console data is")
      console.log(result.data.result);
      setProfileImage(result.data.result)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProfile();
  }, [])
  return (
    <Box sx={{ display: "flex" }} className="parentAll">
      <div
        onClick={() => setOpen(!open)}
        className={open ? "openClose1" : "openClose2"}
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="d-flex align-items-center"
          >
            {open ? (
              <img src={bankconnect} alt="" width="200px" />
            ) : (
              <img
                src={bankconnect}
                //  src={logoImage}
                alt=""
                width="200px"
              />
            )}
          </Typography>

          <div className=" navLeft">
            <div className="mx-2">
              <span style={{ fontSize: "12px" }}>Hello,</span>&nbsp;
              <span className="username">
                {localStorage.getItem("userName")}
              </span>
            </div>

            <Link to="Myinfo" style={{width:"100%"}}>
              <img
                src={`http://localhost:9241/EmployeeProfile/${profileImage}`}
                alt=""
                width="45px"
                style={{ borderRadius: "20px", marginLeft: "10px", height: "60px"}}
              />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {
            <>
              {sidebarLink.map((item, index) => {
                return (
                  <div className="sidebarcontainer mb-3 " key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? " iconcontainer mx-3 iconActive"
                          : " iconcontainer mx-3"
                      }
                    >
                      <img
                        src={item.iconUrl}
                        alt="not found"
                        className="iconstyle"
                      />
                    </NavLink>

                    <div>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? "linkNAme activeClass mx-2"
                            : "linkNAme mx-2"
                        }
                        onClick={() =>
                          item.name === "Logout" ? logout() : null
                        }
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </>
          }
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f9f9f9" }}
        className="mainBlockSideBar"
      >
        <DrawerHeader />
        <div className="bdcolor" >
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}
