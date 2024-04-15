import React from 'react'
import './Explore.css';
import map from './Images/mapquality.png'
import Health from './HealthForm';

function Explore() {
  return (
    <>
    
    <div className='explore'>
      <h1>Let's Explore</h1>
    </div>
    <div className="explore">
      
      <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224150.4205162784!2d76.92706373233423!3d28.61926090955083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1aafdb891567%3A0x10d270731c930a87!2sGuru%20Gobind%20Singh%20Indraprastha%20University!5e0!3m2!1sen!2sin!4v1713197862067!5m2!1sen!2sin" 
      width="600" 
      height="450" 
      style={{border:"0"}}
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">

      </iframe>
      
      
     
    </div>,
    <Health/>,
    <div className='map'>
    <img src={map} alt="Card" className="card-image" />

    </div>
    </>
    
  )
}

export default Explore
