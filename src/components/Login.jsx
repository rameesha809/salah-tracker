import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginModal = ({ show, handleClose }) => {
  return (
    <div className={`modal-overlay ${show ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}`}>
      {show && (
        <div className="modal-container">
          <button className="close-button" onClick={handleClose}>×</button>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPassword4" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="inlineInputGroup">Username</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input type="text" className="form-control" id="inlineInputGroup" placeholder="Username" />
              </div>
            </div>
            <button type="submit" className="btn" style={{backgroundColor:'#12467B', color:'white'}}>Sign in</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default LoginModal;