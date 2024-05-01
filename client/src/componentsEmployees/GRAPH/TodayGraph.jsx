import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './TodayGraph.css';

function TodayGraph({ punchInTime }) {
    const currentTime = new Date(); // Current time

    // Parse the punch-in time
    const [punchInHourMinute, punchInAmPm] = punchInTime.split(' ');
    const [punchInHour, punchInMinute,punchInSecond] = punchInHourMinute.split(':');
    const punchInTimes = new Date();
    punchInTimes.setHours(parseInt(punchInHour) + (punchInAmPm.toLowerCase() === 'pm' ? 12 : 0));
    punchInTimes.setMinutes(parseInt(punchInMinute));
    punchInTimes.setSeconds(parseInt(punchInSecond));

    // Calculate time difference in milliseconds
    var timeDifferenceMs = 0
    if(currentTime>punchInTimes){
        timeDifferenceMs = currentTime-punchInTimes;
    } else {
        timeDifferenceMs = punchInTimes-currentTime;
    }

    // Convert time difference to hours and minutes
    const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));

    // Format the time difference
    const totalTimes = `${hoursDifference.toString().padStart(2, '0')}:${minutesDifference.toString().padStart(2, '0')} hrs`;

    // Calculate percentage filled
    const totalMilliseconds = 8 * 60 * 60 * 1000 + 30 * 60 * 1000; // 8 hours 30 minutes in milliseconds
    const percentageFilled = (timeDifferenceMs / totalMilliseconds) * 100;

    return (
        <div className="bgcolor" style={{width:"120px"}}>
            <CircularProgressbar
                value={percentageFilled}
                text={totalTimes}
                styles={buildStyles({
                    pathColor: 'rgb(66, 133, 244)', 
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                })}
            />
        </div>
    );
}

export default TodayGraph;
