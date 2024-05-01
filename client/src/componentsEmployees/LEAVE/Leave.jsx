import React, { useEffect, useState } from "react";
 import "../MYINFO/Myinfo.css";
import axios from "axios";
import LeaveTable from "./LeaveTable";
import Pagination from "@mui/material/Pagination";
import Search from "../../commonComponentsEmployees/SearchBox/Search";
// import FilterDate from "../../commonCompMerchant/filterDate/FilterDate";
import Card from "../../commonComponentsEmployees/Card/Card";
import baseUrl from "../config/baseUrl";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
// import Loader from "../Loader/Loader";
const Footer = ({ setPage, page, totalPage, message }) => {
  const pageNumber = (e, p) => {
    setPage(p);
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">{message}</div>
        </div>
        <div className="col-4">
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={5}
            siblingCount={0}
            size="large"
            color="primary"
            onChange={pageNumber}
          />
        </div>
      </div>
    </>
  );
};

const SecondBlock = ({
  orderNumber,
  setorderNumber,
  setDate,
  setFrom,
  setTo,
  xlData,
  setXlData,
}) => {
  
  return (
    <>
      <div className="row  my-5 align-items-center ">
      <div className="col-9">
          <Search orderNumber={orderNumber} setorderNumber={setorderNumber} />
        </div>
        <div className="col-3">
          <Link to={`RequestLeave`}>
            <button className="downloadDeposite">Request for Leave</button>
          </Link>
        </div>

      </div>
    </>
  );
};

function Leave() {
  const { dropdownMerchant } = useStateContext();
  // CARD DATa
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [xlData, setXlData] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  // Today Yesterday Customise filter
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tableBodyData, setTableBodyData] = useState([]);
  const [loading,setLoading] =useState(true)


  // +++++++++++++++++++++Table Data++++++++++++++++++++

  useEffect(() => {
    tabledatafetch();
    cardFetchData()
  }, [page, orderNumber, date, to, from]);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      if (date) {
        formData.append("date", date);
        formData.append("page", page);
      } else if (from && to) {
        formData.append("from", from);
        formData.append("to", to);
        formData.append("page", page);
      } else if (orderNumber) {
        formData.append("settlementId", orderNumber);
        formData.append("page", page);
      } else {
        formData.append("page", page);
        formData.append("id", dropdownMerchant);
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/leaveDefaultData`,
        formData,
        config
      );

      // setCardData(result.data.card);
      setTableBodyData(result.data.data);
      setTotalPage(result.data.totalPage);
      setMessage(result.data.message);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  

  const cardFetchData = async () => {
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    if (date) {
      formData.append("date", date);
    } else if (from && to) {
      formData.append("from", from);
      formData.append("to", to);
    } else if (orderNumber) {
      formData.append("searchItem", orderNumber);
    } else {
      formData.append("id", dropdownMerchant);
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/leaveCardDetails`, formData, config)
      .then((res) => {
        setCardData( res?.data.data);
    })
    .catch((err) => console.log(err));
  };


  // if(loading){
  //   return <Loader />
  // }

  return (
    <>
      <h4 className="heading animate__backInDown">Leave Apply</h4>
      <div className="row">
        <div className="col-12">
          <Card carddata={cardData} />
        </div>
        <div className="row">
          <div className="col-10">
            <SecondBlock
              orderNumber={orderNumber}
              setorderNumber={setorderNumber}
              setDate={setDate}
              setFrom={setFrom}
              setTo={setTo}
              tableBodyData={tableBodyData}
              xlData={xlData}
              setXlData={setXlData}
            />
          </div>
        </div>
        <div className="col-12">
          <LeaveTable
            tableBodyData={tableBodyData}
            xlData={xlData}
            setXlData={setXlData}
          />
        </div>
      </div>

      <Footer
        setPage={setPage}
        page={page}
        totalPage={totalPage}
        message={message}
      />
    </>
  );
}

export default Leave;
