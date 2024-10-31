import React, { useState } from 'react';
import ThemeSignInPage from './Auth/ThemeSignInPage'; // Ensure the correct import path
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../redux/SignInSlice'; // Import your logout action
import 'animate.css'; // Import Animate.css

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch(); // Initialize dispatch

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    handleClose();
  };

  const handleLogoutClick = () => {
    const modalElement = document.getElementById('logoutModal');
    if (modalElement) {
      modalElement.classList.add('show', 'animate__animated', 'animate__fadeIn'); // Add animation classes
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
    }
  };

  const confirmLogout = () => {
    dispatch(logout()); // Clear the token from Redux state or wherever it is stored
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token'); // Adjust this line based on your token storage
    closeLogoutModal(); // Close the modal after logout
  };

  const closeLogoutModal = () => {
    const modalElement = document.getElementById('logoutModal');
    if (modalElement) {
      modalElement.classList.remove('show', 'animate__fadeIn'); // Remove animation classes
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <nav className="navbar bg-body-tertiary fixed-top d-flex flex-row align-items-center">
        <div className="container-fluid d-flex align-items-center">
          <i className="fas fa-mosque me-2 icon-blue"></i>
          <a className="navbar-brand">Salah Tracker</a>
          
          {isLoggedIn ? (
            <div
              onClick={handleLogoutClick}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#12467B',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: 'auto',
                fontSize: '20px',
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
          ) : (
            <button className="btn d-flex ms-auto" style={{ backgroundColor: '#12467B', color: 'white' }} onClick={handleLoginClick}>
              Login
            </button>
          )}

          {showLogin && (
            <ThemeSignInPage
              handleClose={handleClose}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </div>
      </nav>

      {/* Bootstrap Logout Modal */}
      <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
              <button type="button" className="close" onClick={closeLogoutModal} style={{ marginLeft: 'auto' }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeLogoutModal}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={confirmLogout}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
