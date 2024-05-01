import React from 'react'
import  BirthdayCard  from './BirthdayCard'
import OnTimeOnLateFilter from './OnTimeOnLateFilter'
import AdminCharts from './AdminCharts'
import TodayAllEmployeePresentAbsent from "./TodayAllEmployeePresentAbsent"
function Dashboard() {
  return (
    <>
    <div className='row'>
      <div className='col-md-5'>
<AdminCharts />
<TodayAllEmployeePresentAbsent />
      </div>
    <div className='col-md-3'>
  <BirthdayCard />
</div>
<div className='col-md-4'>
  <OnTimeOnLateFilter />
</div>
    </div>

    </>
  )
}

export default Dashboard