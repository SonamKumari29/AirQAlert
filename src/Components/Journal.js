import React from 'react';
import './Journal.css';
import im1 from './Images/im1.jpeg'
import img2 from './Images/img2.jpeg'
import img3 from './Images/img3.jpeg'
import img4 from './Images/img4.jpeg'
import img5 from './Images/img5.jpeg'
import im6 from './Images/img6.jpeg'
//import im7 from './Images/img7.jpeg'

function Journal() {

  return (
    <>
    <div className='head'>
      <h1>
        Health guidelines for You 
      </h1>

    </div>
    <div className='main-section'>

    
    <div className="card">
      <div className="image-container">
        <img src={im1} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3>Air Purifier: </h3>
        <p> "Transform your living space into a sanctuary of clean air with our advanced air purifier technology. Say goodbye to pollutants and allergens, and hello to fresh, revitalizing air for you and your loved ones."</p>
      </div>

      <div className="image-container">
        <img src={img2} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3>Plants</h3>
        <p>Nature's air purifiers, our carefully selected plants not only add beauty to your home but also actively filter out toxins and pollutants, creating a healthier indoor environment. Embrace the soothing presence of greenery while enjoying cleaner, fresher air</p>
      </div>

      <div className="image-container">
        <img src={img3} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>
    </div>


    <div className="card">

    <div className="image-container">
        <img src={img4} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>
      <div className="image-container">
        <img src={img5} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>

      <div className="image-container">
        <img src={im6} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>
    </div>

    <div className="card">
      <div className="image-container">
        <img src={im1} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>

      <div className="image-container">
        <img src={img2} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>

      <div className="image-container">
        <img src={img3} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>
    </div>

    <div className="card">
      <div className="image-container">
        <img src={im1} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3>Air Purifier: </h3>
        <p> "Transform your living space into a sanctuary of clean air with our advanced air purifier technology. Say goodbye to pollutants and allergens, and hello to fresh, revitalizing air for you and your loved ones."</p>
      </div>

      <div className="image-container">
        <img src={img2} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3>Plants</h3>
        <p>Nature's air purifiers, our carefully selected plants not only add beauty to your home but also actively filter out toxins and pollutants, creating a healthier indoor environment. Embrace the soothing presence of greenery while enjoying cleaner, fresher air</p>
      </div>

      <div className="image-container">
        <img src={img3} alt="Card" className="card-image" />
      </div>
      <div className="card-content">
        <h3></h3>
        <p>this is the product</p>
      </div>
    </div>


    </div>

      

      
    </>
    
  );
}

export default Journal
