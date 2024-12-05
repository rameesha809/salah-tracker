import React, { useState } from 'react';
import ThemeSignInPage from './Auth/ThemeSignInPage';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/SignInSlice';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      modalElement.classList.add('show', 'animate__animated', 'animate__fadeIn');
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
    }
  };

  const confirmLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    closeLogoutModal();
  };

  const closeLogoutModal = () => {
    const modalElement = document.getElementById('logoutModal');
    if (modalElement) {
      modalElement.classList.remove('show', 'animate__fadeIn');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
    }
  };

  const handleLinkClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      handleLoginClick(); // Show login modal
    } else {
      navigate(path); // Navigate to the desired route
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <nav className="navbar bg-body-tertiary fixed-top d-flex flex-row align-items-center" style={{zIndex:'500'}}>
        <div className="container-fluid d-flex align-items-center">
          <i className="fas fa-mosque me-2 icon-blue"></i>
          <Link className="navbar-brand" to={'/'}>Salah Tracker</Link>
          <div className="mcontainer" style={{ marginLeft: 'auto', marginRight: '10px', display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
            <div className="row">
              <div className="col-sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/Docs" className="nav-link"><b>Docs</b></Link>
              </div>
              <div className="col-sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/Hadith-details" className="nav-link"><b>Hadith</b></Link>
              </div>
              <div className="col-sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link
                  to="/Missing"
                  className="nav-link"
                  onClick={(e) => handleLinkClick(e, '/Missing')}
                >
                  <b>Missing Prayers</b>
                </Link>
              </div>
              <div className="col-sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link
                  to="/Saved"
                  className="nav-link"
                  onClick={(e) => handleLinkClick(e, '/Saved')}
                >
                  <b>Saved Hadith</b>
                </Link>
              </div>
            </div>
          </div>

          {isLoggedIn ? (
            <div
              onClick={handleLogoutClick}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#12467B',
                color: 'white',
                backdropFilter: 'blur(5px)',
                animation: 'fadeIn',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
          ) : (
            <button className="btn d-flex" style={{ backgroundColor: '#12467B', color: 'white' }} onClick={handleLoginClick}>
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
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
              <button
                type="button"
                className="close"
                onClick={closeLogoutModal}
                style={{ marginLeft: 'auto' }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
