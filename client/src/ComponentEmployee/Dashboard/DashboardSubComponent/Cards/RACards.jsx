import React from 'react';
import './RACard.css';

const RACard = ({ image, title, paragraph }) => {
  return (
    <div className='card ra-card' style={{ width: "8rem" }}>
      <img src={image} alt={title} className='card-image' />
      <div className='card-content mt-2'>
        <h2 className='card-title' id="ra-title">{title}</h2>
        <p className='card-paragraph' id="ra-para">{paragraph}</p>
      </div>
    </div>
  );
};

export default RACard;
