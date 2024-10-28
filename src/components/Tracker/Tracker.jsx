import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti';
import { postPrayer ,fetchPrayers} from '../../redux/PrayerSlice';
import { useDispatch } from 'react-redux';
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

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 is Sunday, 1 is Monday, and so on
    const weekDates = {};

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDayIndex === 0 ? 6 : currentDayIndex - 1)); 

    days.forEach((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index); // Set date for each day of the week
      weekDates[day] = date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    });

    return weekDates;
  };

  const weekDates = getCurrentWeekDates();

  const handleSalahChange = async (day, prayer) => {
    const newValue = !prayersDone[day][prayer];
    const prayerDate = weekDates[day]; 
    console.log("Prayer Date:", prayerDate);

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
    dispatch(postPrayer({ userId: "10", prayersDone: prayerDetailsForDay }));
  };
  const fetchPrayersData = async () => {
    try {
      const response = await dispatch(fetchPrayers("10")); // Fetching prayer data for userId "10"
      const fetchedData = response.payload; // Adjust based on your API response structure
      console.log("fetched data:",fetchedData);
      
      const updatedPrayersDone = { ...prayersDone };
      Object.entries(fetchedData).forEach(([date, prayerData]) => {
        const dayIndex = new Date(date).getDay(); // Get day index (0 for Sunday, 1 for Monday, etc.)
        const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]; // Convert index to day name (0 => sun, 1 => mon, etc.)
        
        Object.entries(prayerData).forEach(([prayer, status]) => {
          updatedPrayersDone[dayName][prayer] = status.done; // Set the prayer status
        });
      });

      setPrayerDone(updatedPrayersDone);
    } catch (error) {
      console.error("Error fetching prayers:", error);
    }
  };

  useEffect(() => {
    fetchPrayersData();
  }, []);
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
    </div>
  );
  
}
