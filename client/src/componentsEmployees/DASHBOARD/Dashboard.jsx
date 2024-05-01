import { Button, Typography } from "@mui/material";
import React,{useEffect, useState} from "react";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import PieChartsfun from "../GRAPH/TodayGraph";
import axios from "axios";
import EmployeeThisWeek from "./EmployeeThisWeek";
import EmployeeWeekPunchInPunchOut from "./EmployeeWeekPunchPunchOut"
import { useStateContext } from "../../context/ContextProvider";

import "./Dashboard.css";
import baseUrl from "../config/baseUrl";
import { useNavigate } from "react-router-dom";
function Dashboard() {
let auth = localStorage.getItem("user");
const navigate = useNavigate()
let date = new Date();
let currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; 
hours = hours.toString().padStart(2, '0');
minutes = minutes.toString().padStart(2, '0');
seconds = seconds.toString().padStart(2, '0');
let currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

const [todayDataGraph,setTodayGraphData] = useState([])

const [yesterdayTotalHour,setYesterdayTotalHour] = useState("");

const [weekPercentage,setWeekPercentage] = useState("")
const [weekHours,setWeekHours] = useState("");

const [monthPercentage,setMonthPercentage] = useState("")
const [monthHours,setMonthHours] = useState("")

const [punchIn,setPunchIn] = useState("");
const [punchOut,setPunchOut] = useState("");

const { setIsLoginUser } = useStateContext();

  async function TotalInHours() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/todayData`,{},config)
      console.log(result)
      setPunchIn(result.data.result[0].First_in)
      setPunchOut(result.data.result[0].Last_out)
      setTodayGraphData(result.data.result)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    TotalInHours(); 
    const interval = setInterval(() => {
      TotalInHours(); 
    }, 0); // 1 minute = 60000 milliseconds
    return () => clearInterval(interval); 
  }, []);
  async function WeeklyTotalInHours() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/WeeklyData`,{},config)
      console.log(result.data.totalInTime)
      setWeekPercentage(result.data.percentage)
      setWeekHours(result.data.totalInTime)
      
    } catch (error) {
      console.log(error)
    }
  }
  async function MonthlyTotalHours() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/MonthlyData`,{},config)
      console.log(result.data.totalInTime)
      setMonthPercentage(result.data.progressPercentage)
      setMonthHours(result.data.totalInTime)
      
    } catch (error) {
      console.log(error)
    }
  }
  async function YesterdayTotalHours() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/YesterdayData`,{},config)
      console.log(result.data.result[0].Total_in_time)
      setYesterdayTotalHour(result.data.result[0].Total_in_time)
      
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>
{  
  YesterdayTotalHours();
  WeeklyTotalInHours();
  MonthlyTotalHours();
},[])
  // *******************Today graph code End here ******************

  // progress bar code here
  // const percentageFilled = (value / totalTimeMinutes) * 100;
  //
  async function punchOuts() {
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
  localStorage.clear("user");
  setIsLoginUser(undefined);
  navigate("/bankconnect/employee/login-employee");
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Typography variant="h6">Attendance Dashboard</Typography>
        </div>
      </div>
      <div className="row gap-4 mt-2">
      {
  todayDataGraph.map((item) => (
  <div className="col-md-4 card shadow">
  <div className="row offset-md-1 mt-4">
    <div className="col-md-6">
      <Typography variant="h7">Time Sheet</Typography>
    </div>
    <div className="col-md-6">
      <Typography variant="h9">{currentDate}</Typography>
    </div>
  </div>
  <div className="row mt-4">
    <div className="col-md-10 mx-auto card timeDate-container">
      <div className="row">
        <div className="col-md-6">
          <Typography variant="h9">Punch in at</Typography>
        </div>
        <div className="col-md-6">
          <Typography variant="h9">{item.First_in}</Typography>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Typography variant="h9">current  Time</Typography>
        </div>
        <div className="col-md-6">
          <Typography variant="h9">{currentTime}</Typography>
        </div>
      </div>
    </div>
  </div>
  <div className="row mt-4  mx-auto">
    <div className="col-md-12">
      <PieChartsfun punchInTime = {punchIn}/>
    </div>
  </div>
  <div className="row mt-4 mb-4">
    <div className="col-md-12 text-center">
      <Button variant="contained" color="success" size="small" onClick={()=>(punchOuts())}>
        Punch Out
      </Button>
    </div>
  </div>
</div>
  ))
}
        <div className="col-md-4 card shadow">
          <Typography variant="h6" className="dashboard-heading">Statistics</Typography>
         <div className="row card m-2">
            <div className="col-md-12 mx-auto m-3">
              <div className="row">
                <div className="col-md-4">
                  <Typography variant="h8">Yesterday</Typography>
                </div>
                <div className="col-md-8 text-end">{yesterdayTotalHour ? yesterdayTotalHour : 0}  hrs</div>
              </div>
              <div class="progress mt-1">
                <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: +(yesterdayTotalHour ? 100 : 0)+"%" }}
                ></div>
              </div>
            </div>
          </div> 
        
            <div className="row card m-2">
            <div className="col-md-12 mx-auto m-3">
              <div className="row">
                <div className="col-md-4">
                  <Typography variant="h8">This Week</Typography>
                </div>
                <div className="col-md-8 text-end">{weekHours ? weekHours : 0} hrs</div>
              </div>
              <div class="progress mt-1">
                <div
                  class="progress-bar bg-danger"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: weekPercentage + "%" }}
                ></div>
              </div>
            </div>
          </div>
          

          <div className="row card m-2">
            <div className="col-md-12 mx-auto m-3">
              <div className="row">
                <div className="col-md-6">
                  <Typography variant="h8">This Month</Typography>
                </div>
                <div className="col-md-6 text-end">{monthHours ? monthHours : 0} hrs</div>
              </div>
              <div class="progress mt-1">
                <div
                  class="progress-bar bg-orange"
                  role="progressbar"
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="10"
                  style={{ width: monthPercentage + "%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 card shadow" style={{overflowY:"scroll",overflowX:"hidden"}}>
          <div className="row">
            <div className="col-md-12">
              <Typography variant="h8">Today Activity</Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <div className="line" style={{height:'80%'}}></div>
                <div >
                </div>
                </div>
                <div className="col-md-9">
                  punch In/Punch Out
                </div>
              </div>
             <div className="row">
              <div className="col-md-3">
              <CircleOutlinedIcon className="myPunchInCircle" />
              </div>
              <div className="col-md-9 mt-2" style={{position: "absolute",left:"27%"}}>
                {punchIn}
              </div>
             </div>
             <div className="row">
              <div className="col-md-3">
              <CircleOutlinedIcon className="myPunchOutCircle" />
              </div>
              <div className="col-md-9 mt-2" style={{position: "absolute",top: "70%",left:"27%"}}>
                {punchOut}
              </div>
             </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2 gap-5">     
        <div className="col-md-5 card">
        <div style={{fontSize: "18px",fontWeight: "544" ,margin:"5%"}}>This Week</div>
        <EmployeeThisWeek />
        </div>
        <div className="col-md-6 card shadow">
 <EmployeeWeekPunchInPunchOut />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// https://mui.com/x/react-charts/pie-demo/
