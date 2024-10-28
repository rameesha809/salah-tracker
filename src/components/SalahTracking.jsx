import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SalahTracking() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/missing');
    }
    return (
        <div className="adh-outer blue d-flex justify-content-center align-items-center flex-column">
            <div className='adhkar-container d-flex flex-row justify-content-center align-items-center'>
                <div className="text d-flex justify-content-center align-items-center">

                    <p>Track your missed salahs with ease, ensuring you never lose sight of your spiritual goals</p>
                </div>
                <div className="salimg d-flex justify-content-center align-items-center">

                    <img src="src/assets/time.png" alt="time" />
                </div>
            </div>
            <button className='btn adh-btn' style={{ backgroundColor: 'white' }} onClick={() => handleClick()}><b>My missing salahs</b></button>
        </div>
    )
}
