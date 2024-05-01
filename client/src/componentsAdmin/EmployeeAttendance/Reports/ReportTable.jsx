import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function PayoutTable({ tableBodyData, xlData, setXlData }) {
  const [users, setUsers] = useState([]);
  console.log(tableBodyData)
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
      console.log(tempUser);
      setXlData(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.created_on === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
      setXlData(tempUser.filter((item) => item.isChecked));
      console.log(xlData);
    }
  };

  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell align="center"> Date</TableCell>
              <TableCell align="center">Punch in</TableCell>
              <TableCell align="center">Punch out</TableCell>
              <TableCell align="center">Total in-time</TableCell>
              <TableCell align="center">Day</TableCell>
              <TableCell align="center">Status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell align="center">{item.Date}</TableCell>
                  <TableCell align="center">{item.First_in}</TableCell>
                  <TableCell align="center">{item.Last_out}</TableCell>
                  <TableCell align="center">{item.Total_in_time}</TableCell>
                  <TableCell align="center">{item.Day}</TableCell>
                  <TableCell align="center">
                    {item.Status === 'Present' ? (
                      <HowToRegIcon  style={{ color: 'green' }} />
                    ) : (
                      <HowToRegIcon  style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell className="statusblock">
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


