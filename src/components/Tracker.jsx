import React, { useEffect, useState } from 'react'

export default function Tracker() {
    const [prayersDone, setPrayerDone] = useState({
        fajr: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
        dhuhr: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
        asr: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
        maghrib: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
        isha: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
    })
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const handleSalahChange = async (prayer, day) => {
        setPrayerDone((prev) => ({
            ...prev,
            [prayer]: {
                ...prev[prayer],
                [day]: !prev[prayer][day], 
            },
        }));
    };
    useEffect(() => {
        console.log("Updated Salah Data:", prayersDone);
    }, [prayersDone]);

    return (
        <div className="container-outer">
            <div className="container mt-7 d-flex flex-column align-items-center">
                <h2 className="text-center mb-4">Salah Tracker</h2>
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
                      checked={prayersDone[prayer][day]}
                      onChange={() => handleSalahChange(prayer, day)}
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


    )
}
