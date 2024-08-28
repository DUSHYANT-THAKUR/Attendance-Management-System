import React from 'react'
import './Card.css'

const MinyCards = ({ title,bg,icon,rightArrow,onClick}) => {
  return (
    <div className='card miny-card ' style={{border:"none",cursor:"pointer"}} onClick={onClick}>
        <div className='card-body miny-card' style={{backgroundColor:bg}}>
            <h3 className='card-title company-title text-light' >{icon} {title} {rightArrow}</h3>
        </div>
    </div>
  )
}

export default MinyCards