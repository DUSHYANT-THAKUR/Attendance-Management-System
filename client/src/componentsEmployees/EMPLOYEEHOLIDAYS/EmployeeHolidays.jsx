
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import baseUrl from "../config/baseUrl";
import axios from "axios";


function Holiday() {
  let auth = localStorage.getItem("user")
  const [holidays,setHolidays] = useState([]);
let allHolidays = async () => {
try {
let config = {
  headers : {
    "Content-type" : "application/json",
    accept : "application/json",
    Authorization : `Bearer ${auth}`
  }
}
let result = await axios.post(`${baseUrl}/allHolidays`,{},config)
console.log(result.data.result)
setHolidays(result.data.result)
} catch(error) {
  console.log(error)
}
}
useEffect(()=>
{
allHolidays()
},[])
  return (
    <>
    <div className="row">
        <div className="col-md-9">
        <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: ""
        }}
        events={holidays}
        selectable={true}
        height={"80vh"}
        dayCellContent={(arg) => {
          const today = new Date();
          if (
            arg.date.getDate() === today.getDate() &&
            arg.date.getMonth() === today.getMonth() &&
            arg.date.getFullYear() === today.getFullYear()
          ) {
            return (
              <div className="fc-daygrid-day-number fc-day-today" style={{backgroundColor: 'red', color: 'white',borderRadius:"60%"}}>
                {arg.dayNumberText}
              </div>
            );
          }
          return arg.dayNumberText;
        }}
      />
    </div>
        </div>

    <div className="col-md-3 mt-0" style={{ marginTop: "6%" }}>
          <div style={{ height: "80.5vh", width: "100%", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)", borderRadius: "10px", overflowY: "auto", overflowX: "hidden" }}>
            <div className="row">
              <div className="col-md-12 mt-2 text-center" style={{ fontWeight: "600" }}>
                Upcoming Holiday
              </div>
              <div style={{ height: "3px", width: "100%", backgroundColor: "red", display: "block", textAlign: "center", margin: "auto" }} className="mt-1"></div>
            </div>
            <div className="row mt-2" style={{ margin: "auto", padding: "0px", width: "100%" }} >
              <table className="table table-striped" >
                <thead>
                  <tr>
                    <th className="text-center" style={{ borderRight: "2px solid #ddd", fontSize: "15px", fontWeight: "540" }}>Event Name</th>
                    <th className="text-center" style={{ fontSize: "15px", fontWeight: "540" }}>Date</th>
                  </tr>
                </thead>
                {
                  holidays.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td className="text-center" style={{ fontSize: "13px" }}>{item.title}</td>
                        <td className="text-center" style={{ fontSize: "13px" }}>{item.start}</td>
                      </tr>
                    </tbody>
                  ))
                }
              </table>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}

export default Holiday;

