import React, { useEffect, useState } from 'react';
import './Calendar.css';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import baseUrl from '../../../config/baseUrl';



const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showYearSelector, setShowYearSelector] = useState(false);
   const [holiday,setHoliday] = useState([]);
   const auth = localStorage.getItem('user');

  const renderHeader = () => {
    const dateFormat = { weekday: 'short', month: 'short', day: 'numeric' };
    const monthYearFormat = { month: 'long', year: 'numeric' };

    return (
      <div className="header">
        <div className="current-day">
          <span>{currentDate.toLocaleDateString('en-US', dateFormat)}</span>
          <span className="edit-icon"><EditIcon/></span>
        </div>
        <hr />
        <div className="month-selector">
        <div className="month-year">
            {currentDate.toLocaleDateString('en-US', { month: 'long' })}
            <span className="year-selector" onClick={() => setShowYearSelector(!showYearSelector)}>
              {currentDate.getFullYear()}<span className="icon"><ArrowDropDownIcon/></span>
            </span>
            {showYearSelector && renderYearSelector()}
          </div>
          <div className="icon" onClick={() => prevMonth()}>
            <KeyboardArrowLeftIcon/>
          </div>
         
          <div className="icon" onClick={() => nextMonth()}>
           <KeyboardArrowRightIcon/>
          </div>
        </div>
      </div>
    );
  };

  const renderYearSelector = () => {
    const years = [];
    for (let i = -5; i <= 5; i++) {
      years.push(currentDate.getFullYear() + i);
    }

    return (
      <div className="year-dropdown">
        {years.map((year) => (
          <div
            key={year}
            className="year-option"
            onClick={() => selectYear(year)}
          >
            {year}
          </div>
        ))}
      </div>
    );
  };

  const selectYear = (year) => {
    const newDate = new Date(currentDate.setFullYear(year));
    setCurrentDate(newDate);
    setShowYearSelector(false);
  };

  const renderDays = () => {
    return (
      <div className="days row">
        {daysOfWeek.map((day, index) => (
          <div className="col col-center" key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(monthStart.getDate() - monthStart.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.getDate();
        const cloneDay = new Date(day);
        const isCurrentDate = isSameDay(day, new Date());
        const isSelectedDate = isSameDay(day, selectedDate);

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isCurrentDate
                ? 'current-date'
                : isSelectedDate
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = new Date(day.setDate(day.getDate() + 1));
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth();
  };

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };
async function threeUpcomingHoliday() {
  let config = {
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${auth}`
    }
  }
  // let response = await axios.post(`${baseUrl}/upcomingThreeHolidays`,{},config)
  // console.log(response.data.result);
  // setHoliday(response.data.result)
}
useEffect(()=>{
  threeUpcomingHoliday()
},[])
  return (
    <div className="calendar-outer" style={{height:"99%"}}>
      <h5>Calendar</h5>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div className='row mt-4 '>
        <div className='col-12' style={{fontWeight:"600"}}>Upcoming Events</div>
      </div>
      <hr/>
      {
  holiday.map((item, index) => (
    <div key={index}>
      <p style={{ fontSize: "12px", marginTop: "5px",width: "20%",backgroundColor: "#afffafb5",textAlign: "center",color: "green",borderRadius: "10%" }}>Holiday</p>
      <h6 className='name'>Holiday Name - {item.title}</h6>
      <p className='month-time'>{item.start} | All Day</p>
      <hr />
    </div>
  ))
}
    </div>
  );
};

export default Calendar;

