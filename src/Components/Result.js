import React, { useState } from 'react';
import './Result.css';
import level from './Images/airlevel.png'

function Result() {
  const [aqi, setAqi] = useState('');
  const [message, setMessage] = useState('');

  const handleAqiChange = (e) => {
    const value = parseInt(e.target.value);
    setAqi(value);

    if (value >= 0 && value <= 50) {
      setMessage('AQI level is perfect. No need to wear a mask or take other precautions.');
    } else if (value >= 51 && value <= 100) {
      setMessage('Air quality is acceptable, but sensitive individuals may consider wearing a mask if they are particularly sensitive to pollutants or have respiratory conditions.');
    } else if (value >= 101 && value <= 150) {
      setMessage('Sensitive groups, such as children, elderly individuals, and people with respiratory conditions like asthma or COPD, may benefit from wearing a mask when the AQI reaches this level or higher.');
    } else if (value >= 151 && value <= 200) {
      setMessage('Everyone may begin to experience adverse health effects at this level, and wearing a mask is advisable, especially for outdoor activities.');
    } else if (value >= 201 && value <= 300) {
      setMessage('Health risks increase significantly at this level, and wearing a mask is recommended for everyone, particularly for prolonged outdoor exposure.');
    } else if (value >= 301 && value <= 500) {
      setMessage('Air quality is extremely poor, and wearing a mask is strongly advised for everyone when outdoors. It\'s also recommended to limit outdoor activities as much as possible.');
    } else {
      setMessage('');
    }
  };

  return (
    <div className="result-container">
      <h2>Check AQI Level</h2>
      <div>
        <label htmlFor="aqi-input">Enter AQI Level:</label>
        <input
          type="number"
          id="aqi-input"
          value={aqi}
          onChange={handleAqiChange}
        />
      </div>
      <div className="message">
        {message && <div>{message}</div>}
      </div>
      <div className='image-level'>
        <img className="image-level" src={level} alt=""/>
      </div>
    </div>
  );
}

export default Result;

