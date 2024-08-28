import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Paginations from "../CommonComponentEmployee/Pagination/Pagination";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "./Employee.css"
import Search from "../CommonComponentEmployee/Search/Search";
function Employee() {
    const auth = localStorage.getItem("user");
    const [team, setTeam] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [message, setMessage] = useState("");

    const fetchTeam = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            };
            let data = {
                page: page,
                searchitem: searchItem
            }
            // let result = await axios.post(`${baseUrl}/fetchTeam`, data, config);
            // setTeam(result.data.result);
            // setTotalPage(result.data.totalPage)
            // setMessage(result.data.message)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchTeam();
    }, [page, searchItem]);

    return (
        <div className="content-container m-5">
            <h5 className="m-3" style={{ fontWeight: '700' }}>Team Members</h5>
            <div>
                <div className="row search-container m-1">
                    <div className="col-3">
                        <Search serchItem={searchItem} setSearchItem={setSearchItem} />
                    </div>
                    <div className="col-9 text-end">
                        <button className="btn btn-primary ms-2">Download</button>
                    </div>
                </div>
            </div>
            <TableContainer className="tablecontainer2 mt-4">
                <Table sx={{ minWidth: 650 }} className="table-striped table-hover" aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell className="tablefont-align">Employee ID</TableCell>
                            <TableCell className="tablefont-align">Members</TableCell>
                            <TableCell className="tablefont-align">Gender</TableCell>
                            <TableCell className="tablefont-align">Department</TableCell>
                            <TableCell className="tablefont-align">Email Id</TableCell>
                            <TableCell className="tablefont-align">Slack Message</TableCell>
                            <TableCell className="tablefont-align">DOJ</TableCell>
                            <TableCell className="tablefont-align">DOB</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {team.map((item, index) => (
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                key={index}
                            >
                                <TableCell align="center">{item.empid}</TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.gender}</TableCell>
                                <TableCell align="center">
                                    {item.level == "1"
                                        ? "Junior Sales/ Junior BDM"
                                        : item.level == "2"
                                            ? "Sales Manager/BDM"
                                            : item.level == "3"
                                                ? "Senior Sales Manager /Senior BDM"
                                                : item.level == "4"
                                                    ? "Head of Sales & BD"
                                                    : "NOT DEFINED"}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`mailto:${item.email}`}>{item.email}</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => window.open(item.slack_profile, "_blank")}
                                    >
                                        Slack Profile
                                    </button>
                                </TableCell>
                                <TableCell align="center">{item.doj}</TableCell>
                                <TableCell align="center">{item.dob}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <Paginations page={page} setPage={setPage} totalPage={totalPage} message={message} />
        </div>
    );
}
export default Employee;