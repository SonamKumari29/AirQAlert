import React from 'react'
import './HomePage.css';
import myImage from './Images/Home.jpg'
import level from './Images/levels.jpg'
function Home() {
  return (
    <div className="fullscreen-image-container">
      <div className="fullscreen-image">
        <img src={myImage} alt="home image" />
      </div>
      <div className='space'></div>
      <div className='block'>
        <img src={level} alt="home image" />
        

      </div>
    </div>

  )
}

export default Home
