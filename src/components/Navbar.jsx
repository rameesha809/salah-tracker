import React, { useState } from 'react'
import Auth from './Auth/Auth';
export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setShowLogin(false);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 300);
  };
    return (
        <div style={{paddingBottom:"20px"}}>
  <nav className="navbar bg-body-tertiary fixed-top d-flex flex-row align-items-center">
    <div className="container-fluid d-flex align-items-center">
      <i className="fas fa-mosque me-2 icon-blue"></i>
      <a className="navbar-brand">Salah Tracker</a>
      <button className="btn d-flex ms-auto" style={{backgroundColor:'#12467B', color:'white'}} onClick={handleLoginClick}>Login</button>

      {isModalVisible && <Auth show={showLogin} handleClose={handleClose} />}  
    </div>
  </nav>
</div>

    )
}
