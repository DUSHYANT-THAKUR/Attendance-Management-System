import React, { useEffect, useState } from "react";
import "./Header.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import { Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router";
import Popover from "@mui/material/Popover";
import axios from "axios";
import baseUrl from "../config/baseUrl";


const Header = () => {
  const auth = localStorage.getItem('user')
  const name = localStorage.getItem('userName')
  const navigate = useNavigate();
  const { setIsLoginUser,messageList,setMessageList } = useStateContext();

  const [anchorEle, setAnchorEle] = useState(null);
  const [count, setCount] = useState("");
  const [profileImage,setProfileImage] = useState("")
  const [greeting, setGreeting] = useState('');
  const handleClick = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEle(null);
  };

  const open = Boolean(anchorEle);
  const id = open ? "simple-popover" : undefined;
  const data = [
    {
      imgUrl:
        "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg",
      title: "Frankie Sullivan commented on your post",
      desc: "This is looking great! Let's get started on it",
      time: "Friday 2:20pm",
      date: "Sep 20, 2024",
    },
    {
      imgUrl:
        "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg",
      title: "Frankie Sullivan commented on your post",
      desc: "This is looking great! Let's get started on it",
      time: "Friday 2:20pm",
      date: "Sep 20, 2024",
    },
  ];
  async function Notification() {
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    // let result = await axios.post(`${baseUrl}/slackApiWebToSlack`, {}, config)
    // console.log(result.data.message.messages)
    // setMessageList(result.data.message.messages)
    // setCount(result.data.message.messages[0].messageCount)
  }
  async function defaultProfile() {
    let config = {
      headers : {
        'Content-Type':"application/json",
        accept:"application/json",
        Authorization : `Bearer ${auth}`
      }
    }
    // const response = await axios.post(`${baseUrl}/showProfile`,{},config);
    // setProfileImage(response.data.result[0].profile_img)
  }
  useEffect(() => {
    if (messageList.length === 0) {
      Notification();
    } else {
      setTimeout(() => {
        Notification();
      }, 15000);
    }
  }, [messageList]);
  useEffect(()=>{
defaultProfile();
  },[profileImage])
  useEffect(() => {
    const setGreetingMessage = () => {
      const now = new Date();
      const hours = now.getHours(); // Get the current hour (0-23)

      if (hours >= 0 && hours < 12) {
        setGreeting('Good Morning');
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    setGreetingMessage();
    
    // Optional: Update the greeting every minute
    const intervalId = setInterval(setGreetingMessage, 60000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha(theme.palette.grey[200], 0.5),
    "&:hover": {
      backgroundColor: alpha(theme.palette.grey[200], 0.7),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "30ch",
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isDropdownOpen = Boolean(dropdownAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleDropdownOpen = (event) => {
  //   setDropdownAnchorEl(event.currentTarget);
  // };

  // const handleDropdownClose = () => {
  //   setDropdownAnchorEl(null);
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="primary">
          <Badge badgeContent={4} color="error">
            {/* <MailIcon /> */}
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon style={{ color: "#000" }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Notifications
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {data.map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-2">
                        <Stack direction="row" spacing={2}>
                          <Avatar alt="Remy Sharp" src={item.imgUrl} />
                        </Stack>
                      </div>
                      <div className="col-10">
                        <p className="title">{item.title}</p>
                        <div
                          className="shadow-none p-1 mb-3 border border-grey rounded"
                          style={{ fontSize: "15px" }}
                        >
                          {item.desc}
                        </div>
                        <div className="row d-flex justify-content-between">
                          <div
                            className="col-5"
                            style={{ fontSize: "13px", fontWeight: "600" }}
                          >
                            <p>{item.time}</p>
                          </div>
                          <div
                            className="col-5"
                            style={{ fontSize: "13px", fontWeight: "600" }}
                          >
                            {item.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-footer d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <DoneAllIcon className="text-primary" />
                  <p className="ms-2 text-primary">Mark all as read</p>
                </div>
                <button type="button" className="btn btn-primary">
                  View all notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          {/* <AccountCircle /> */}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // const renderDropdownMenu = (
  //   <Menu
  //     anchorEl={dropdownAnchorEl}
  //     open={isDropdownOpen}
  //     onClose={handleDropdownClose}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //   >
  //     <MenuItem onClick={handleDropdownClose}>Option 1</MenuItem>
  //     <MenuItem onClick={handleDropdownClose}>Option 2</MenuItem>
  //     <MenuItem onClick={handleDropdownClose}>Option 3</MenuItem>
  //   </Menu>
  // );
  const LoggedOut = () => {
    localStorage.clear("user");
    localStorage.clear("role");
    setIsLoginUser(undefined);
    navigate("/bankconnect/employee/login-employee");
  }
  return (
    <Box sx={{ flexGrow: 1 }} className="d-flex">
      {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="menu-icon d-lg-none"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon className="fs-1"/>
          </IconButton> */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "none", // Remove box shadow
          borderBottom: "1px solid #e0e0e0", // Add bottom border
        }}
      >
        <Toolbar >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar src={`${baseUrl}/${profileImage}`} alt="Profile Image" style={{width:"50px",height:"50px"}}/>
            </IconButton>
            <Box>
              <Typography style={{textShadow:"0.2px 0.2px black"}}>{greeting}</Typography>
              <Typography variant="caption" style={{fontStyle:"italic"}}>{name}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              className="notification-icon"
              sx={{ display: { xs: "none", md: "flex" } }}
              aria-describedby={id} variant="contained" onClick={handleClick}
            >
              <Badge badgeContent={count} color="error">
                <NotificationsIcon style={{ color: "#000" }} />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEle}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              style={{ marginLeft: "-38px", height: "75%" }}
            >
              <div style={{ width: "315px", padding: "10px", height: "430px", overflowY: "hidden" }}>
                <div>
                  <Typography variant="h6" component="div" style={{fontWeight:"bold",textShadow:"1px 1px red"}}>
                    Notifications
                  </Typography>
                  <hr />
                  <div style={{ maxHeight: "290px", ooverflowY: "auto", overflowX: "hidden" }}>
                    {messageList.map((item, index) => (
                      <div className="row" key={index} style={{ marginBottom: "20px", padding: "10px" }}>
                        <div className="col-2">
                          <Stack direction="row" spacing={2}>
                            <Avatar alt="User Avatar" src={item.imgUrl} />
                          </Stack>
                        </div>
                        <div className="col-10">
                          <p className="title" style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 5px 0", color: "#333" }}>
                            Slack {item.type}
                          </p>
                          <p style={{ fontSize: "14px", margin: "0 0 10px 0", fontWeight: "500", color: "#555", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                            {item.text}
                          </p>
                          <div className="row" style={{ fontSize: "14px" }}>
                            <div className="col-5" style={{ fontWeight: "600", color: "#777" }}>
                              {item.formattedTime}
                            </div>
                            <div className="col-7" style={{ fontWeight: "600", color: "#777", textAlign: "right" }}>
                              {item.formattedDate}
                            </div>
                          </div>
                        </div>
                        <Divider style={{ width: "100%", margin: "10px 0" }} />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3 pb-2 b-0">
                    <div className="d-flex align-items-center">
                      <DoneAllIcon className="text-primary" />
                      <p className="ms-2 text-primary" style={{ margin: 0 }}>
                        Mark all as read
                      </p>
                    </div>
                    <Button size="small" variant="contained" onClick={handleClose}>
                      View all
                    </Button>
                  </div>
                </div>

              </div>
            </Popover>
            <Avatar
              src="https://img.freepik.com/free-vector/round-flag-india_23-2147813736.jpg?size=626&ext=jpg&ga=GA1.1.490917368.1717673222&semt=ais_hybrid"
              alt="UK Flag"
              sx={{ width: 34, height: 34 }}
            />
            {/* <Button
              endIcon={<ArrowDropDownIcon />}
              onClick={handleDropdownOpen}
              sx={{
                color: "#808080", // Grey color for the dropdown text
                borderColor: "transparent",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              EN
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={LoggedOut}
            >
              Log Out
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* {renderDropdownMenu} */}
    </Box>
  );
};

export default Header;
