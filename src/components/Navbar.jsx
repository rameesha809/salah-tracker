import React from 'react'

export default function Navbar() {
    return (
        <div style={{paddingBottom:"20px"}}>
  <nav className="navbar bg-body-tertiary fixed-top d-flex flex-row align-items-center">
    <div className="container-fluid d-flex align-items-center">
      <i className="fas fa-mosque me-2 icon-blue"></i>
      <a className="navbar-brand">Salah Tracker</a>
      <form className="d-flex ms-auto" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </nav>
</div>

    )
}
