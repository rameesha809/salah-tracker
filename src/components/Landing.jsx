import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchIslamicDateTime } from '../redux/IslamicDateTimeSlice';
import Adhkar from './Adhkar';
import SalahTracking from './SalahTracking';
export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { date, loading, error } = useSelector((state) => state.islamicDateTime);
  const [current, setCurrent] = useState(null);
  const TodayDate = () => {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    setCurrent(formattedDate);
    return (
      <div>
        <p>Today's Date: {formattedDate}</p>
      </div>
    );
  };
  const handleclick = () => {
    navigate('/Tracker')
  }

  useEffect(() => {
    dispatch(fetchIslamicDateTime());
    TodayDate();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="outer" style={{minHeight:'50vh'}}>
        <div className='landing' style={{backgroundImage:'url(src/assets/fm.jpg)'}}>
          <div className="dark ">
            <div className="content"><h2>"Stay Connected with Your Prayers"
              <p>Track your Salah with ease and consistency.
                Never miss a prayer, and keep your spiritual journey on track.
                Organize, reflect, and grow with our intuitive Salah tracking tool.</p>

            </h2></div>
          </div>
          <div className="btndiv">
            <button className='btn btn-outline-primary' onClick={() => handleclick()}>Track Salah</button>
          </div>
          <div className="date d-flex justify-content-end align-items-end" style={{ color: "white" }}>
            <div className="dateinner" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px' }}>
              {loading ? (<p>Loading...</p>) : error ? (<p>Error: {error}</p>) : date ? (
                <p>AH {date.hijri.year} &lrm;,&lrm; {date.hijri.day} &lrm;,&lrm; {date.hijri.month.ar}</p>
              ) : (<p>Islamic Date not available.</p>)}
              {current} AD
            </div>
          </div>
        </div>
      </div>
      <SalahTracking />
      <Adhkar />
    </>
  )
}
