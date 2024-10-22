import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function Adhkar() {
    const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/Hadith-details')
  }
    return (
    <div className="adh-outer d-flex justify-content-center align-items-center flex-column">
    <div className='adhkar-container d-flex flex-row justify-content-center align-items-center'>
      <div className="text d-flex justify-content-center align-items-center">
        <b>"Acccess different hadith books and get ahadith in three different languages. (Arabic, Urdu, English)"
        </b></div>
      <div className="adhimg d-flex justify-content-center align-items-center">
        <img src="src/assets/prayer-mat.png" alt="prayer" />
      </div>
    </div>
    <button className='adh-btn btn ' onClick={()=>handleClick()} style={{backgroundColor:'#12467B', color:'white'}}>Explore Hadith</button>
    </div>
  )
}
