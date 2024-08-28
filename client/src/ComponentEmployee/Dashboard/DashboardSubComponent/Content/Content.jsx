import React, { useState, useEffect } from "react";
import Card from "../Cards/Card";
import { useStateContext } from "../../../../context/ContextProvider";
import "./Content.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EastIcon from "@mui/icons-material/East";
import MinyCards from "../Cards/MinyCards";
import ResourceAssetst from "../ResourceAssetst";
import ApexChart from "../Chart/Chart";
import { Dialog, DialogTitle, IconButton, DialogContent,Button } from "@mui/material";
import baseUrl from "../../../config/baseUrl";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import {Link} from "react-router-dom"

function Content() {
  const auth = localStorage.getItem('user');
  const { messageList } = useStateContext();
  const [totalCommissions, setTotalCommission] = useState('');
  const [task, settaskData] = useState([]);
  const [todayCommission, setTodayCommission] = useState('');
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [trainingDialogOpen, setTrainingDialogOpen] = useState(false);
  const [viewRequestDialogOpen, setViewTaskRequestDialogOpen] = useState(false);
  const [team,setTeam] = useState([]);

  const handleTeamDialogOpen = () => setTeamDialogOpen(true);
  const handleTrainingDialogOpen = () => setTrainingDialogOpen(true);
  const handleViewRequestDialogOpen = () => setViewTaskRequestDialogOpen(true);

  const handleDialogClose = () => {
    setTeamDialogOpen(false);
    setTrainingDialogOpen(false);
    setViewTaskRequestDialogOpen(false);
  };

  const fetchtask = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      // let result = await axios.post(`${baseUrl}/defaultTask`, {}, config);
      // settaskData(result.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTeam = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      // let result = await axios.post(`${baseUrl}/fetchTeam`, {}, config);
      // setTeam(result.data.result)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchtask();
    fetchTeam();
  }, []);

  const TeamDialog = ({ open, formData }) => (
    <Dialog open={open} onClose={() => setTeamDialogOpen(false)} maxWidth="md" fullWidth >
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>Teams</div>
        <IconButton edge="end" color="inherit" onClick={() => setTeamDialogOpen(false)} aria-label="close">
          <CloseIcon style={{ backgroundColor: "#B8D1FF", borderRadius: "50%", padding: "5%" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover" >
            <thead className="thead-dark">
              <tr>
                <th>Members</th>
                <th>Department</th>
                <th>Email Id</th>
                <th>Slack Message</th>
              </tr>
            </thead>
            <tbody>
              {team.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    {item.level == '1'
                      ? 'Junior Sales/ Junior BDM'
                      : item.level == '2'
                        ? 'Sales Manager/BDM'
                        : item.level == '3'
                          ? 'Senior Sales Manager /Senior BDM'
                          : item.level == '4'
                            ? 'Head of Sales & BD'
                            : 'NOT DEFINED'}
                  </td>
                  <td>
                    <Link to={`mailto:${item.email}`}>{item.email}</Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => window.open(item.slack_profile, '_blank')}
                    >
                      Slack Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {team.length > 0 && (
          <div className="text-end me-3">
            <Button>
              <Link to="/bankconnect/employee/Employee">view more</Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
  const TrainingDialog = ({ open }) => (
    <Dialog open={open} onClose={() => setTrainingDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>Training</div>
        <IconButton edge="end" color="inherit" onClick={() => setTrainingDialogOpen(false)} aria-label="close">
          <CloseIcon style={{ backgroundColor: "#b8d1ff", borderRadius: "50%", padding: "5%" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        No Training Data Available
      </DialogContent>
    </Dialog>
  );
  let ViewTaskRequestDialog = ({ open }) => (
    <Dialog open={open} onClose={() => setViewTaskRequestDialogOpen(false)} maxWidth="md" fullWidth >
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>All Requests</div>
        <IconButton edge="end" color="inherit" onClick={() => setViewTaskRequestDialogOpen(false)} aria-label="close">
          <CloseIcon style={{ backgroundColor: "#b8d1ff", borderRadius: "50%", padding: "5%" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <div className="table-responsive card">
          <table className="table">
            <TableHead>
              <TableRow>
                <TableCell>Request By</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Request</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {task.map((item, index) => (
                <tr key={index}>
                  <td>{item.requested_by}</td>
                  <td>{item.department}</td>
                  <td>{item.created_on}</td>
                  <td>{item.request_data}</td>
                  <td style={{ width: "20%" }}>
                    <button
                      style={
                        item.status === '1'
                          ? { backgroundColor: "rgb(201, 250, 214)", color: "rgb(20, 179, 63)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                          : item.status === '0'
                            ? { backgroundColor: "rgb(245, 190, 204)", color: "rgb(249, 15, 73)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                            : item.status === '2'
                              ? { backgroundColor: "rgb(249, 215, 182)", color: "rgb(238, 159, 81)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                              : { backgroundColor: "rgb(214, 210, 253)", color: "rgb(137, 125, 251)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                      }
                    >
                      {item.status === '1'
                        ? "Completed"
                        : item.status === '0'
                          ? "Canceled"
                          : item.status === '2'
                            ? "In Progress"
                            : "Reviewing"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className="content-container m-5 ">
        <div className="sub-container" style={{ overflow: "hidden" }}>
          <div className="row">
            <div className="col-md-9">
              <h5 className="main-heading">Company Announcement</h5>
              <p className="main-para">
                Here are the latest Announcements from team members and the company.{" "}
                {/* <span className="text-dark">View all</span> */}
              </p>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-lg-4 col-sm-6">
              <Card
                steps={[
                  {
                    subtitle: "Aquiring Updates",
                    title: "Aquiring Updates",
                    subtitle1: "July 19,2024 ",
                    name: "Bon Parazo",
                    text: "This is the text for the first card. lorem10 cgtfy vug bjh jhbuh vjg",
                    // link1: "Read More",
                  },
                  {
                    subtitle: "Another Announcement",
                    title: "Second Title",
                    subtitle1: "July 20, 2024",
                    name: "John Doe",
                    text: "This is the text for the second card. lorem10 cgtfy vug bjh jhbuh vjg",
                    link1: "Learn More",
                  },
                  {
                    subtitle: "Final Announcement",
                    title: "Third Title",
                    subtitle1: "July 21, 2024",
                    name: "Jane Smith",
                    text: "This is the text for the third card. lorem10 cgtfy vug bjh jhbuh vjg",
                    link1: "Discover More",
                  },
                ]}
                buttonColor="#D6D2FD"
                textColor=" #897DFB"
              />
            </div> */}
            <div className="col-lg-4 mt-md-0 mt-sm-2">
              <Card
              steps={[
                {
                  subtitle:"HR Updates",
                  title:"Leave Notification",
                  subtitle1:"July 19,2024",
                  name:"DJ Maling",
                  text:"This is the text for the first card. lorem10 cgtfy vug bjh jhbuh vjg",
                  link1:"Read More"
                },
                {
                  subtitle: "Another Announcement",
                  title: "Second Title",
                  subtitle1: "July 20, 2024",
                  name: "John Doe",
                  text: "This is the text for the second card. lorem10 cgtfy vug bjh jhbuh vjg",
                  link1: "Learn More",
                },
                {
                  subtitle: "Final Announcement",
                  title: "Third Title",
                  subtitle1: "July 21, 2024",
                  name: "Jane Smith",
                  text: "This is the text for the third card. lorem10 cgtfy vug bjh jhbuh vjg",
                  link1: "Discover More",
                },
              ]}
              />
            </div>
            <div className="col-lg-4 col-sm-6">
              <Card
                steps={[
                  {
                    subtitle: "Aquiring Updates",
                    title: "Aquiring Updates",
                    subtitle1: "July 19,2024 ",
                    name: "Bon Parazo",
                    text: "This is the text for the first card. lorem10 cgtfy vug bjh jhbuh vjg",
                    // link1: "Read More",
                  },
                  {
                    subtitle: "Another Announcement",
                    title: "Second Title",
                    subtitle1: "July 20, 2024",
                    name: "John Doe",
                    text: "This is the text for the second card. lorem10 cgtfy vug bjh jhbuh vjg",
                    link1: "Learn More",
                  },
                  {
                    subtitle: "Final Announcement",
                    title: "Third Title",
                    subtitle1: "July 21, 2024",
                    name: "Jane Smith",
                    text: "This is the text for the third card. lorem10 cgtfy vug bjh jhbuh vjg",
                    link1: "Discover More",
                  },
                ]}
                buttonColor="#D6D2FD"
                textColor=" #897DFB"
              />
            </div>
            <div className="col-lg-4 mt-md-0 mt-sm-2">
              <Card
              steps={[
                {
                  subtitle:"HR Updates",
                  title:"Leave Notification",
                  subtitle1:"July 19,2024",
                  name:"DJ Maling",
                  text:"This is the text for the first card. lorem10 cgtfy vug bjh jhbuh vjg",
                  link1:"Read More"
                },
                {
                  subtitle: "Another Announcement",
                  title: "Second Title",
                  subtitle1: "July 20, 2024",
                  name: "John Doe",
                  text: "This is the text for the second card. lorem10 cgtfy vug bjh jhbuh vjg",
                  link1: "Learn More",
                },
                {
                  subtitle: "Final Announcement",
                  title: "Third Title",
                  subtitle1: "July 21, 2024",
                  name: "Jane Smith",
                  text: "This is the text for the third card. lorem10 cgtfy vug bjh jhbuh vjg",
                  link1: "Discover More",
                },
              ]}
                buttonColor="#F9D7B6"
                textColor=" #EE9F51"
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-3 col-md-6 mt-sm-2 mr-2">
            <MinyCards
              title="Teams"
              bg="blue"
              icon={<PersonOutlineIcon sx={{ fontSize: 40 }} />}
              rightArrow={<KeyboardArrowRightIcon sx={{ fontSize: 40 }} />}
              onClick={handleTeamDialogOpen}
            />
            <TeamDialog open={teamDialogOpen} onClose={handleDialogClose} />
          </div>
          <div className="col-lg-3 col-md-6 mt-sm-2">
            <Link to = "/bankconnect/employee/Performanaces" style={{textDecoration:"none"}}>
            <MinyCards
              title="Goals"
              bg="lightBlue"
              icon={<TrackChangesIcon sx={{ fontSize: 40 }} />}
              rightArrow={<KeyboardArrowRightIcon sx={{ fontSize: 40 }} />}
            />
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 mt-sm-2 mr-2">
            <MinyCards
              title="Training"
              bg="orange"
              icon={<WorkspacePremiumIcon sx={{ fontSize: 40 }} />}
              rightArrow={<KeyboardArrowRightIcon sx={{ fontSize: 40 }} />}
              onClick={handleTrainingDialogOpen}
            />
            <TrainingDialog open={trainingDialogOpen} handleClose={handleDialogClose} />
          </div>
          <div className="col-lg-3 col-md-6 mt-sm-2">
            <Link to = "/bankconnect/employee/Attendance" style={{textDecoration:"none"}}>
            <MinyCards
              title="Attendance"
              bg="rgb(251, 102, 102)"
              icon={<RequestPageIcon sx={{ fontSize: 40 }} />}
              rightArrow={<KeyboardArrowRightIcon sx={{ fontSize: 40 }} />}
            />
            </Link>
          </div>
        </div>

        <div className="sub-container1 mt-3">
          <div className="row ">
            <div className="col-md-9">
              <h5 className="main-heading">Task Requests</h5>
            </div>
            <div className="col-md-3">
              <p className="text-primary new-announcement" onClick={handleViewRequestDialogOpen} style={{ cursor: "pointer" }}>
                View all Task Requests <EastIcon />
              </p>

              {/* Render the dialog component */}
              <ViewTaskRequestDialog open={viewRequestDialogOpen} handleClose={handleDialogClose} />
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Requested By</th>
                    <th scope="col">Department</th>
                    <th scope="col">Date</th>
                    <th scope="col">Request</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {task.slice(0, 2).map((item, index) => (
                    <tr key={index}>
                      <td>{item.requested_by}</td>
                      <td>{item.department}</td>
                      <td>{item.created_on}</td>
                      <td>{item.request_data}</td>
                      <td>
                        <button
                          style={
                            item.status === '1'
                              ? { backgroundColor: "rgb(201, 250, 214)", color: "rgb(20, 179, 63)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                              : item.status === '0'
                                ? { backgroundColor: "rgb(245, 190, 204)", color: "rgb(249, 15, 73)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                                : item.status === '2'
                                  ? { backgroundColor: "rgb(249, 215, 182)", color: "rgb(238, 159, 81)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                                  : { backgroundColor: "rgb(214, 210, 253)", color: "rgb(137, 125, 251)", border: "none", padding: "2px 15px", borderRadius: "10%", fontSize: "14px", width: "70%" }
                          }
                        >
                          {item.status === '1'
                            ? "Completed"
                            : item.status === '0'
                              ? "Canceled"
                              : item.status === '2'
                                ? "In Progress"
                                : "Reviewing"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ResourceAssetst />
        <div className="row commissions-card d-flex justify-content-center mt-3">
          <div className="col-md-6 total-card mt-sm-2 ">
            <h6 className="mt-3 commissions-heading">Total Commissions</h6>
            <p style={{ color: "#0d6efd" }}>${totalCommissions}</p>
          </div>
          <div className="col-md-6 mt-md-2 today-card ms-2 mt-sm-2" style={{ width: "35rem" }}>
            <h6 className="mt-3 commissions-heading">Today's Commissions</h6>
            <p className="text-primary">${todayCommission}</p>
          </div>
        </div>
        <ApexChart totalCommissions={totalCommissions} setTotalCommissions={setTotalCommission} todayCommission={todayCommission} setTodayCommission={setTodayCommission} />
      </div>
    </>
  );
}

export default Content;
