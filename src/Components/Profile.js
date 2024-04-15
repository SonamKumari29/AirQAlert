import React, { useState } from 'react';
import './Profile.css'; // Import CSS file for styling

function Profile() {
  const userDetails = {
    username: "JohnDoe",
    email: "john@example.com",
    points: 500,
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNewId = () => {
    alert("Create new ID functionality not implemented.");
  };

  return (
    <div className="profile">
      {isLoggedIn ? (
        <div className="profile-details">
          <h1>Welcome, {userDetails.username}!</h1>
          <p>Email: {userDetails.email}</p>
          <p>Points: {userDetails.points}</p>
          <div className="buttons">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="new-id-button" onClick={handleNewId}>Create New ID</button>
          </div>
        </div>
      ) : (
        <div className="login">
          <h1>Profile</h1>
          <p>You are not logged in.</p>
          <button className="login-button" onClick={() => setIsLoggedIn(true)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Profile;

