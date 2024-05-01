import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import baseUrl from "../config/baseUrl";
import axios from "axios";


function CommonLeave({
requestedId,
  setRequestedId,
  leaveType,
  setLeaveType,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  reason,
  setReason,
  employeeId,
  setEmployeeId,
  requestedAmount,
  handleSubmit,
  buttonText,
}) {
    const auth = localStorage.getItem("user");
   

      useEffect(() => {
        detailSettlement();
      }, []);

      const detailSettlement = async() => {
        try{
        let formData = new FormData();
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
    
          let result = await axios.post(
            `${baseUrl}/leaveUserEmpId`,
            formData,
            config
          );
          setEmployeeId(result.data.data[0].wallet)
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <>
        <div className="row">
            <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                    >
                        Request ID
                    </label>
                    <input
                        type="text"
                        className="input1"
                        value={requestedId}
                        disabled
                    />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000", textAlign: "left", marginLeft: "30px" }}
                    >
                        Type of Leave
                    </label>
                    <select className="form-select form-select-sm mb-3 boldOption" value={leaveType} onChange={(e)=>setLeaveType(e.target.value)}>
                        <option> Select</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                    </select>
                    </div>

                    <div className="col-md-3 d-flex flex-column text-center  ">
                        <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                        >
                        From Date
                        </label>
                        <input 
                            type="Date" 
                            className="input1" 
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center  ">
                        <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                        >
                        To Date
                        </label>
                        <input 
                            type="Date" 
                            className="input1" 
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)} 
                        />
                    </div>
                    <hr style={{ width: "95%" }} />

                    <div className="col-md-3 d-flex flex-column text-center  ">
                        <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                        >
                        Reason
                        </label>
                        <input 
                            type="text" 
                            className="input1" 
                            value={reason}
                            onChange={(e) => setReason(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-3 d-flex flex-column text-center">
                    <label
                        htmlFor=""
                        className="forminputDeposite"
                        style={{ fontWeight: "700", color: "#000" }}
                    >
                        Employee ID
                    </label>
                    <input 
                        type="text" 
                        className="input1" 
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    />
                    </div>
                    
                    <hr style={{ width: "95%" }} />

                    <div className="col-md-3">
                        <div
                            defaultValue="0"
                            className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                        >
                            <div className="mx-2 w-100">
                                <h6
                                    style={{
                                    color: "#000009",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    }}
                                >
                                    Total Days
                                </h6>
                                <h6
                                    style={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    }}
                                >
                                    {
                                        requestedAmount ? requestedAmount : 0
                                    }
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 d-flex align-items-center justify-content-end">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{
                                borderRadius: "50px",
                                marginTop: "20px",
                                color: "#fff",
                                background: "#1EAAE7",
                                display: "flex",
                                marginLeft: "auto",
                                width: "120px",
                                height: "40px"
                            }}
                            className="downloadDeposite px-4"
                        >
                        <img
                            src="https://www.bankconnect.online/assets/merchants/img/send.png"
                            alt=""
                            width="25px"
                            style={{marginRight: "10px"}}
                        />{" "}
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </div>
        </div> 
    </>
  );
}

export default CommonLeave;
