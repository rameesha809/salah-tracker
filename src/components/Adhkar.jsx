import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function Adhkar() {
    const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/Adhkar-details')
  }
    return (
    <div className="adh-outer d-flex justify-content-center align-items-center flex-column">
    <div className='adhkar-container d-flex flex-row justify-content-center align-items-center'>
      <div className="text d-flex justify-content-center align-items-center">
        <b>"Click the button below to access a collection of daily Adhkar for remembrance and spiritual reflection."
        </b></div>
      <div className="adhimg d-flex justify-content-center align-items-center">
        <img src="src/assets/prayer-mat.png" alt="prayer" />
      </div>
    </div>
    <button className='adh-btn btn ' onClick={()=>handleClick()} style={{backgroundColor:'#12467B', color:'white'}}>Get Adhkar</button>
    </div>
  )
}
