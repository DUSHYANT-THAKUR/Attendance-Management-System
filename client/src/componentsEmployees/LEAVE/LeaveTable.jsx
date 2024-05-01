import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import rupee from './rupee.svg'

const ButtonBox = ({ name }) => {
  return (
    <>
      <button
        className={
          name === "Failed"
            ? "tablestatusbuttonFail"
            : name === "Success"
            ? "tablestatusbuttonComp"
            : "tablestatusbuttonWait"
        }
      >
        {name}
      </button>
    </>
  );
};

export default function LeaveTable({ tableBodyData, xlData, setXlData }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(tableBodyData);
  }, [tableBodyData]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
      setXlData(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.settlementId === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
      setXlData(tempUser.filter((item) => item.isChecked));
    }
  };

  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{whiteSpace: "nowrap"}}>
            <TableRow>
              <TableCell>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="allSelect"
                  checked={!users.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>Requested ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Total No. of Days</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Emp ID</TableCell>
              <TableCell>Requested Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.settlementId}
                      checked={item?.isChecked || false}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell className="tablebold">{item.reqid}</TableCell>
                  <TableCell className="tablebold">{item.leavetype}</TableCell>
                  <TableCell className="tablebold">
                    <div className="d-flex justify-content-between">
                      { item.status === 1 ? (
                        <ButtonBox name="Approved" />
                      ) : item.status === 2 ? (
                        <ButtonBox name="Pending" />
                      ) : item.status === 3 ? (
                        <ButtonBox name="Pending" />
                      ) : (
                        <ButtonBox name="Rejected" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.fromdate}</TableCell>
                  <TableCell className="tablebold">{item.todate}</TableCell>
                  <TableCell className="tablebold">{item.totalleavecount}</TableCell>
                  <TableCell className="tablebold">{item.reason}</TableCell>
                  <TableCell className="tablebold">{item.user_empid}</TableCell>
                  <TableCell>{item.requesteddate}</TableCell>
                  <TableCell><DialogOpenModel formData={item} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const DialogOpenModel = ({ formData }) => {
  const [open, setOpen] = React.useState(false);
 console.log(formData)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <button
          onClick={handleClickOpen}
          className="btn btn-outline-primary"
        >
          View 
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              top: "0",
              margin: "0",
              borderRadius: "30px",
            },
          }}
        >
          <button
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#1eaae7',
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
            Leave Request View
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1" >
                <form action="" className="row justify-content-around" >
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Request ID
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.reqid}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Leave Type
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.leavetype}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      From
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.fromdate}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      To
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.todate}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  
                  <div className="col-md-4 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Total No. of Day
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.totalleavecount}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Reason
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.reason}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Requested Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.requesteddate}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3">
                    <div
                      className="dilogfirstbutton d-flex justify-content-center align-items-center"
                    >
                      <div className="mx-2">
                        <h6 style={{ color: "#000009", whiteSpace: "nowrap" }}>Status</h6>
                        <h6 style={{ fontWeight: "600", fontSize: "18px" }}>
                        { formData.status === 1 ? (
                        <ButtonBox name="Approved" />
                      ) : formData.status === 2 ? (
                        <ButtonBox name="Pending" />
                      ) : formData.status === 3 ? (
                        <ButtonBox name="Pending" />
                      ) : (
                        <ButtonBox name="Rejected" />
                      )}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    
                  </div>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
