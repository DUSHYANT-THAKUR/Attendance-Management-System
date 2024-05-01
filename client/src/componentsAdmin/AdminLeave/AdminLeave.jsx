import { TableCell } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"

 import PaginationComp from "../../commonAdminComponents/Pagination/PaginationComp"
import baseUrl from "../config/baseUrl"

function AdminLeave() {
  //leaveDetails
  const [data, setData] = useState([])
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [message, setMessage] = useState("");
let auth = localStorage.getItem("admin")

  const fetchData = async () => {

    let value={
      page:page,
      searchitem:search
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    let result = await axios.post(`${baseUrl}/leaveDetails`,value,config)
    setData(result.data.data)
    setTotalPage(result.data.totalPage)
    setMessage(result.data.message)


  }
  useEffect(() => {
    fetchData()

  }, [page,search])

    const searchHandle=(event)=>{
      setSearch(event.target.value)

  }

  const handleButtonClick = async (reqid, status) => {

    let value = {
      requestedid: reqid,
      status: status
    }

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      }
    }
    let result = await axios.post(`${baseUrl}/updateleave`, value, config)
    console.log(result.data.message)
    fetchData()
  }
 


  return (
    <div>
      <div style={{ marginBottom: '25px' }}>
        <div className="serachbox">
          <input
            type="search"
            placeholder="Search"
            className="search1"
          value={search}
           onChange={searchHandle}
          />
          <img
            src="https://www.bankconnect.online/assets/merchants/img/search.svg"
            alt=""
            className="icon"
            style={{ cursor: "pointer" }}
          // onClick={()=>setSearchval(search)}
          />
        </div></div>

      <div style={{ overflowX: 'auto' }}>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>RequestedId</th>
              <th>Action</th>
              <th>Status</th>
              <th>EmployeeId</th>
              <th>LeaveType</th>
              <th>FromDate</th>
              <th>ToDate</th>
              <th>TotalLeave</th>
              <th>Reason</th>
              <th>RequestedDate</th>

            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <TableCell align="center">{item.reqid}</TableCell>
                  <TableCell align="center">
                    <Button style={{display:"block"}}
                      variant={"danger"}
                      onClick={() => handleButtonClick(item.reqid, 3)}>
                      Rejected
                    </Button>
                    <Button style={{display:"block",marginTop:"10px"}}
                      variant={"success"}
                      onClick={() => handleButtonClick(item.reqid, 1)}>
                      Approved
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant={item.status === 3 ? "danger" : item.status === 1 ? "success" : "warning"}>
                      {item.status === 3 ? "Rejected" : item.status === 1 ? "Approved" : "Pending"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">{item.user_empid}</TableCell>
                  <TableCell align="center">{item.leavetype}</TableCell>
                  <TableCell align="center">{item.fromdate}</TableCell>
                  <TableCell align="center">{item.todate}</TableCell>
                  <TableCell align="center">{item.totalleavecount}</TableCell>
                  <TableCell align="center">{item.reason}</TableCell>
                  <TableCell align="center">{item.requesteddate}</TableCell>

                </tr>

              ))
            }



          </tbody>
        </Table>
      </div>
      <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />

    </div>
  )
}
export default AdminLeave
