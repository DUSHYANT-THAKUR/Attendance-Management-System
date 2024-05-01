import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../commonAdminComponents/SearchBox/Search";
import PaginationComp from "../../commonAdminComponents/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import * as XLSX from "xlsx";
import FilterDateMax from '../../commonAdminComponents/filterDateMax/FilterDateMax';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function EmployeeAttendance() {
  const tableHeading = [
"EmpId",
"Name",
"Date",
"Punch In",
"Punch Out",
"Total-in-hours",
"Status"
  ];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')


  const ReadData = async () => {
    try {
       const values = {page,date,to,from,searchitem:searchVal}
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/defaultEmployeeAttendance`, values, config);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };
  const downloadExl = () => {
    const auth = localStorage.getItem("admin");
    let formData = new FormData();
    formData.append("searchitem", searchVal);
    formData.append("date",date)
    formData.append("to", from );
    formData.append("from", to );
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
  
    axios.post(`${baseUrl}/downloadEmployeeAttendance`, formData, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Employee Attendance");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "Employee Attendance.xlsx");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, date, to, from]);
 
  const TableBodyCom = () => {
    return (
      <>
<TableBody>
  {tableData && tableData.length > 0 ? (
    tableData.map((item, index) => {
      return (
        <TableRow
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#bfbfbf",
              cursor: "auto"
            },
          }}
          key={index}
        >
          <TableCell align="center">{item.empid}</TableCell>
          <TableCell align="center">
                    <Link to={`/bankconnect/report/${item.user_id}/${item.name}`} style={{ textDecoration: 'underline' }}>
                      {item.name}
                    </Link>
                  </TableCell>
          <TableCell align="center">{item.Date}</TableCell>
          <TableCell align="center">{item.First_in}</TableCell>
          <TableCell align="center">{item.Last_out}</TableCell>
          <TableCell align="center">{item.Total_in_time}</TableCell>
          <TableCell align="center">  
                  {item.Status === 'Present' ? (   
                      <button type="button" class="btn btn-outline-info"><HowToRegIcon  style={{ color: 'green' }} /></button>
                    ) : (   
                      <button type="button" class="btn btn-outline-danger"><HowToRegIcon  style={{ color: 'red' }} /></button>
                    )}
                  </TableCell>
        </TableRow>
      );
    })
  ) : (
    <TableRow>
      <TableCell align="center" colSpan={6}>
        <h4>No Data Found</h4>
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </>
    );
  };
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row align-items-center">
          <h4 className="mb-3 headingAll">Employee Attendance</h4>
          <div className="col-4 mb-3">
            <Search searchVal={searchVal} setSearchval={setSearchval} />
          </div>
          <div className="col-4 mb-3">
            <FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/>
          </div>
          <div className="col-4 mb-3">
            <button className="btn"
              style={{
                background: "#1caae8",
                borderRadius: "60px",
                color: "#fff",
                width: "100px",
                height: "40px",
                cursor: "pointer",
                float: "right"
              }} onClick={downloadExl}>Download</button>
          </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
        <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
      </Box>
    </>
  );
}
export default EmployeeAttendance;
