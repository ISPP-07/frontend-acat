import React from 'react';
import styles from '../styles/InterventionCard.css';

function InterventionCard({ appointment }) {
  return (
    <div className="container"> 
      <span className="text" style={{ fontFamily: 'Arial' }}>{appointment.user}</span>
      <img className="icon" src="/calendar.svg" />
        <img className="tag" src="/calendar-days.svg" />
        <span className="tag2">{appointment.date}</span>
      </div>
  );
} 

export default InterventionCard;

