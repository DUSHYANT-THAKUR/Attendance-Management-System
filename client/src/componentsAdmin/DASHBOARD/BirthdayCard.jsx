import React, { useEffect, useState } from "react";
import "./BirthdayCard.css";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined"
import axios from "axios";
import baseUrl from '../config/baseUrl';

export default function BirthdayStatus() {
  let [data,setData] = useState([])
  let auth = localStorage.getItem("admin")
  async function BirthdayCard(req, res) {
    try {
      let config = {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${auth}`
        }
      }
      let result = await axios.post(`${baseUrl}/UpcomingBirthday`, {}, config)
      console.log(result.data.result)
      setData(result.data.result)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    BirthdayCard();
  },[])
  return (
    <div className="container card card-5" style = {{  width: "100%",height: "92vh",background: "whitesmoke",borderRadius: "5px",display: "inline-block",padding: "0.3rem",paddingTop: "1rem",position: "relative",overflowY: "auto"}}>
      <div className="row">
          <p className="cardTitle">Upcoming Birthday</p>
          <BirtdayCards birthdayCardDetails={data} />
      </div>
    </div>
  );
}

function BirtdayCards({ birthdayCardDetails }) {
  const cardList = birthdayCardDetails.map((birthdayCardData) => (
    <BirthdayCard
      birthdayCardData={birthdayCardData}
      key={birthdayCardData.employeeId}
    />
  ));
  return (
    <div className="container">
      <div className="row">
        <div className="col">{cardList}</div>
      </div>
    </div>
  );
}

function BirthdayCard({ birthdayCardData }) {
  return (
    <div className="container myCard">
      <div className="row">
        <div className="col-6">
        <p> Name:</p>
        </div>
        <div className="col-6">
        <p>{birthdayCardData.name}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
        <p>Employee Id: </p>
        </div>
        <div className="col-6">
        <div className="status">{birthdayCardData.empid}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
        <p>DOB:</p>
        </div>
        <div className="col-6">
        <div className="status">{birthdayCardData.dob}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
        <p>Designation:</p>
        </div>
        <div className="col-6">
        <div className="status">{birthdayCardData.team}</div>
        </div>
      </div>
    </div>
  );
}
