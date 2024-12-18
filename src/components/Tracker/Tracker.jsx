import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { postPrayer, fetchPrayers } from '../../redux/PrayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import ThemeSignInPage from '../Auth/ThemeSignInPage';

export default function Tracker() {
  const dispatch = useDispatch();
  const [prayersDone, setPrayerDone] = useState({
    mon: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    tue: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    wed: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    thu: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    fri: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    sat: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    sun: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
  });
  const [showSignInModal, setShowSignInModal] = useState(false);
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.id : null;

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDayIndex = today.getDay(); 
    const weekDates = {};
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDayIndex === 0 ? 6 : currentDayIndex - 1)); 

    days.forEach((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index); 
      weekDates[day] = date.toISOString().split('T')[0]; 
    });

    return weekDates;
  };

  const weekDates = getCurrentWeekDates();

  const handleSalahChange = async (day, prayer) => {
    if (!user) {
      setShowSignInModal(true); 
      return;
    }
    const newValue = !prayersDone[day][prayer];
    const prayerDate = weekDates[day]; 

    setPrayerDone((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [prayer]: newValue, 
      },
    }));

    const prayerDetailsForDay = {
      ...prayersDone[day],
      [prayer]: newValue, 
      prayerDate,
    };

    dispatch(postPrayer({ userId, prayersDone: prayerDetailsForDay }));
  };

  const fetchPrayersData = async () => {
    if (!userId) return; // Early return if no userId
    try {
      const response = await dispatch(fetchPrayers(userId)); 
      const fetchedData = response.payload; 
      
      const updatedPrayersDone = { ...prayersDone };
      Object.entries(fetchedData).forEach(([date, prayerData]) => {
        const dayIndex = new Date(date).getDay(); 
        const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]; 
        const dayEntry = Object.entries(weekDates).find(([, weekDate]) => weekDate === date);
        if (dayEntry) {
          const [dayName] = dayEntry; 
          Object.entries(prayerData).forEach(([prayer, status]) => {
            updatedPrayersDone[dayName][prayer] = status.done; 
          });
        }
      });

      setPrayerDone(updatedPrayersDone);
    } catch (error) {
      console.error("Error fetching prayers:", error);
    }
  };

  useEffect(() => {
    if(userId){

      fetchPrayersData(); 
    }
  }, [userId]);

  useEffect(() => {
    const allChecked = days.every((day) =>
      prayers.every((prayer) => prayersDone[day][prayer])
    );

    if (allChecked) {
      confetti({
        particleCount: 300,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [prayersDone]);

  return (
    <div className="container-outer">
      <div className="container mt-7 d-flex flex-column align-items-center">
        <h2 className="text-center mb-4" style={{color:'white'}}>Salah Tracker</h2>
        <table className="table table-bordered text-center">
          <thead className="table-primary rounded-pill">
            <tr className="rounded-pill">
              <th className="rounded-start">Prayer</th>
              {days.map(day => (
                <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prayers.map(prayer => (
              <tr key={prayer}>
                <td>{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</td>
                {days.map(day => (
                  <td key={day}>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`${prayer}-${day}`}
                      autoComplete="off"
                      checked={prayersDone[day][prayer]} 
                      onChange={() => handleSalahChange(day, prayer)}
                    />
                    <label className={`btn btn-toggle`} htmlFor={`${prayer}-${day}`}></label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSignInModal && (
        <ThemeSignInPage
          handleClose={() => setShowSignInModal(false)}
          onLoginSuccess={(username) => {
            console.log(`Welcome ${username}`);
            setShowSignInModal(false);
          }}
        />
      )}
    </div>
  );
}
