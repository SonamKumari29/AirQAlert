import React, { useState } from 'react';
import './Profile.css'; 
import profilepic from './Images/pic2.png';

function Profile() {
  const userDetails = {
    username: "Shubh krishna",
    email: "shubhkrishna2004@gmail.com",
    points: 500,
    age:20,
    disease: "Sinus"
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNewId = () => {
    alert("Create new ID functionality not implemented.");
  };

  return (
    <>
    
    <div className="profile">
      {isLoggedIn ? (
        <>
        <div className='profile-pic'>
        <img src={profilepic} alt=" profile picture"/>
      </div>
        <div className="profile-details">
          <h1 className='welcome'>Welcome, {userDetails.username}!</h1>
          <p className='email'>Email: {userDetails.email}</p>
          <p className='age'>Age:{userDetails.age}</p>
          <p className='disease'>Disease:{userDetails.disease}</p>

          <div className="buttons">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="new-id-button" onClick={handleNewId}>Edit Profile</button>
          </div>
        </div>
        </>
      ) : (
        <div className="login">
          <h1>Profile</h1>
          <p>You are not logged in.</p>
          <button className="login-button" onClick={() => setIsLoggedIn(true)}>Login</button>
        </div>
      )}
      
    </div>
    </>
  );
}

export default Profile;

