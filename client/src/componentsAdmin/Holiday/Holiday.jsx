
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { Divider } from "@mui/material";
const DialogOpen = () => {
  let auth = localStorage.getItem("admin")
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreateEvent = async (e) => {
    try {
      let formData = new FormData();
      formData.append("event_name", event);
      formData.append("date", date);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`
        },
      };
      let result = await axios.post(`${baseUrl}/createHoliday`, formData, config)
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={handleClickOpen}>
        Add New
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={false}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            top: '0',
            margin: '0',
            borderRadius: '30px',
          },
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#ff6600',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32px',
            height: '32px',
          }}
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <DialogTitle
          id="alert-dialog-title"
          style={{ fontWeight: "700", fontSize: "20px" }}
        >
          Add New Holiday
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12 swapBox">
              <form className="row justify-content-around" >
                <div className="row">
                  <div className="col-4">
                    <label>Event Name</label>
                  </div>
                  <div className="col-8">
                    <input type="text" placeholder="Event Name" className="form-control mb-3" onChange={(e) => setEvent(e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <label>Date</label>
                  </div>
                  <div className="col-8">
                    <input type="Date" placeholder="from" className="form-control mb-3" onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <button className="btn btn" style={{ background: "#ff6600", color: "#fff", marginLeft: "auto", display: "block", width: "100px" }} type="submit" onClick={() => { handleCreateEvent() }}>Create</button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function Holiday() {
  let auth = localStorage.getItem("admin")
  const [holidays, setHolidays] = useState([]);
  let allHolidays = async () => {
    try {
      let config = {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${auth}`
        }
      }
      let result = await axios.post(`${baseUrl}/allHolidays`, {}, config)
      console.log(result.data.result)
      setHolidays(result.data.result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    allHolidays()
  }, [])
  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div>
            <div className="row">
              <div className="col-3 offset-10">
                <DialogOpen />
              </div>
            </div>
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
              height={"85vh"}
              dayCellContent={(arg) => {
                const today = new Date();
                if (
                  arg.date.getDate() === today.getDate() &&
                  arg.date.getMonth() === today.getMonth() &&
                  arg.date.getFullYear() === today.getFullYear()
                ) {
                  return (
                    <div className="fc-daygrid-day-number fc-day-today" style={{ backgroundColor: 'red', color: 'white', borderRadius: "60%" }}>
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
          <div style={{ height: "90.5vh", width: "100%", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)", borderRadius: "10px", overflowY: "auto", overflowX: "hidden" }}>
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

