import React, { useState } from "react";
import CommonLeave from "./CommonLeave";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function RequestLeave() {
  const [requestedId, setRequestedId] = useState(Math.trunc(Math.random() * 1000000));
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("requestedId", requestedId); //requestedid
      formData.append("leaveType", leaveType);   //leavetype
      formData.append("fromDate", fromDate);  //fromdate
      formData.append("toDate", toDate);        //todate
      formData.append("reason", reason);    //reason
      formData.append("employeeId", employeeId);  //employeeid
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/leaveRequested`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankconnect/employee/Leave");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-10">
          <h4 className="headingAll">Request For Leave</h4>
        </div>
        <div className="col-2 text-end">
            <Link to="/bankconnect/employee/Leave">
              <button
                style={{
                  background: "rgb(30, 170, 231)",
                  borderRadius: "30px",
                  color: "#fff",
                  width: "100px",
                  height: "36px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </Link>
        </div>
      </div>
      <CommonLeave
        requestedId={requestedId}
        setRequestedId={setRequestedId}
        leaveType={leaveType}
        setLeaveType={setLeaveType}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        reason={reason}
        setReason={setReason}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default RequestLeave;
