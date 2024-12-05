import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSignInPage from './Auth/ThemeSignInPage'; // Adjust the path if necessary

export default function SalahTracking() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace this with real login state from Redux or context if available
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/missing');
    } else {
      setShowLogin(true); // Show the sign-in modal
    }
  };

  const handleClose = () => {
    setShowLogin(false); // Close the modal
  };

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true); // Set the user as logged in
    setShowLogin(false); // Close the modal
    navigate('/missing'); // Navigate to `/missing` after successful login
  };

  return (
    <div className="adh-outer blue d-flex justify-content-center align-items-center flex-column">
      <div className="adhkar-container d-flex flex-row justify-content-center align-items-center">
        <div className="text d-flex justify-content-center align-items-center">
          <p>Track your missed salahs with ease, ensuring you never lose sight of your spiritual goals</p>
        </div>
        <div className="salimg d-flex justify-content-center align-items-center">
          <img src="src/assets/time.png" alt="time" />
        </div>
      </div>
      <button
        className="btn adh-btn"
        style={{ backgroundColor: 'white' }}
        onClick={handleClick}
      >
        <b>My missing salahs</b>
      </button>

      {showLogin && (
        <ThemeSignInPage
          handleClose={handleClose}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
