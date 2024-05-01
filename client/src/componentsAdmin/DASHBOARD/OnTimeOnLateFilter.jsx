
import React, { useEffect } from "react";
import { useState } from "react";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import axios from "axios";
import baseUrl from '../config/baseUrl';
import "./OnTimeOnLateFilter.css";

 function EmpDetails({ empDetail }) {
    return (
        <>
            <div className="container ps-4 pt-2 pb-2">
                <div className="row">
                    <div className="col-md-auto">
                        <img src={`http://localhost:9241/EmployeeProfile/${empDetail.profile_img}`} alt="avatar" width="50px" />{" "}
                    </div>
                    <div className="col-md">
                        <div
                            className="row"
                            style={{
                                fontFamily: "arial",
                                fontWeight: "bolder",
                                fontSize: "0.9rem",
                            }}
                        >
                            {empDetail.name}
                        </div>
                        <div
                            className="row"
                            style={{
                                fontFamily: "arial",
                                fontSize: "0.8rem",
                            }}
                        >
                            {empDetail.team} | {empDetail.empType}
                        </div>
                        <div
                            className="row"
                            style={{
                                fontFamily: "arial",
                                fontSize: "0.8rem",
                            }}
                        >
                            Login - {empDetail.first_in}
                        </div>
                        <div
                            className="row"
                            style={{
                                fontFamily: "arial",
                                fontSize: "0.8rem",
                            }}
                        >
                            Logout - {empDetail.last_out}
                        </div>
                    </div>
                    <div className="col-md"
                        style={{
                            fontFamily: "arial",
                            fontSize: "0.8rem",
                        }}
                    >
                         <CircleOutlinedIcon
            style={{
                marginRight: "5px",
                color: empDetail.message === "Ontime" ? "green" : "red",
            }}
        />
                        {empDetail.message}
                    </div>
                </div>
                <hr />
            </div> 
        </>
    );
}

 function EmpCards({ empDetails, filterText }) {
    let filteredEmpDetails = empDetails.filter((empDetail) =>
        empDetail.name.toLowerCase().includes(filterText.toLowerCase())
    );
    if(filteredEmpDetails.length==0){
         filteredEmpDetails = empDetails.filter((empDetail) =>
        empDetail.team.toLowerCase().includes(filterText.toLowerCase())
    );
    }

    const empList = filteredEmpDetails.map((empDetail) => (
        <EmpDetails empDetail={empDetail} key={empDetail.empCode} />
    ));

    return <>{empList}</>;
}

 function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form>
                        <input
                            type="text"
                            value={filterText}
                            placeholder="Search employees"
                            onChange={(e) => onFilterTextChange(e.target.value)}
                            style={{
                                paddingRight: "50px",
                                paddingLeft: "10px",
                            }}
                        />
                        {/* <FontAwesomeIcon
                            icon={faSearch}
                            style={{
                                position: "absolute",
                                left: "230px", // Adjust as needed to position the icon horizontally
                                top: "50%", // Adjust as needed to vertically center the icon
                                transform: "translateY(-50%)", // Vertically center the icon
                            }}
                        />{" "} */}
                        <label>View all employees</label>
                    </form>
                </div>
            </div>
        </div>
    );
}

 function EmpAttendence({ empDetails }) {
    const [filterText, setFilterText] = useState("");
    return (
        <>
            <div className="container-fluid card card-5" style={{width:"100%",background: "#fff",borderRadius: "2px",display: "inline-block",padding: "0",paddingTop: "1rem",position: "relative",minHeight:"590px"}}>
                <div className="row">
                    <div className="col" style={{ maxWidth: "550px" }}>
                        <div
                            className="position-relative"
                            style={{ maxHeight: "92vh", overflowY: "auto" }}
                        >
                            <div
                                className="position-sticky top-0"
                                style={{ zIndex: 100, background: "white" }}
                            >
                                <SearchBar
                                    filterText={filterText}
                                    onFilterTextChange={setFilterText}
                                />
                            </div>
                            <div style={{ paddingTop: "10px" }}>
                                <EmpCards empDetails={empDetails} filterText={filterText} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function OnTimeOnLateFilter() {
    const [data ,setData]=useState([]);
    let auth = localStorage.getItem("admin")
      async function OnTimeOnLate(){
        try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${auth}`,
                },
              };
              let result = await axios.post(`${baseUrl}/onTimeOnLateFilter`,{},config)
            //   console.log(result.data.data)
              setData(result.data.data)
        } catch (error){
            console.log(error)

        }
      }
      useEffect(()=>{
        OnTimeOnLate();
                },[])
        return <EmpAttendence empDetails={data} />;
}




