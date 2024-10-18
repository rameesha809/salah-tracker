import React from 'react'
import {useNavigate} from 'react-router-dom'
import Adhkar from './Adhkar';
export default function Landing() {
  const navigate = useNavigate();
  const handleclick = () =>{
    navigate('/Tracker')
  }
  return (
    <>
    <div className="outer">
      <div className='landing'>
        <div className="dark ">
          <div className="content"><h2>"Stay Connected with Your Prayers"
            <p>Track your Salah with ease and consistency.
              Never miss a prayer, and keep your spiritual journey on track.
              Organize, reflect, and grow with our intuitive Salah tracking tool.</p>

          </h2></div>
        </div>
        <div className="btndiv">
          <button className='btn btn-outline-primary' onClick={()=>handleclick()}>Track Salah</button>
        </div>
        <div className="date d-flex justify-content-end align-items-end" style={{color:"white" }}>
        <div className="dateinner" style={{backgroundColor:'rgba(0, 0, 0, 0.7)', padding:'10px'}}>
        10/18/2024
         10/18/2024
        </div>
        </div>
      </div>
    </div>
      <Adhkar />
      </>
  )
}
