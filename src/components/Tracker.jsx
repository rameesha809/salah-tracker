import React from 'react'

export default function Tracker() {
  return (
    <div className="container-outer mt-7">
        <div className="container mt-7 d-flex flex-column align-items-center">
    <h2 className="text-center mb-4">Salah Tracker</h2>
    <table className="table table-bordered text-center">
      <thead className="table-primary rounded-pill">
        <tr className='rounded-pill'>
          <th  className='rounded-start'>Prayer</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th className='rounded-end'>Sun</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fajr</td>
          <td><input type="checkbox" className="btn-check" id="fajr-mon" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-mon"></label></td>
          <td><input type="checkbox" className="btn-check" id="fajr-tue" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-tue"></label></td>
          <td><input type="checkbox" className="btn-check" id="fajr-wed" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-wed"></label></td>
          <td><input type="checkbox" className="btn-check" id="fajr-thu" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-thu"></label></td>
          <td><input type="checkbox" className="btn-check" id="fajr-fri" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-fri"></label></td>
          <td><input type="checkbox" className="btn-check" id="fajr-sat" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-sat"></label></td>
          <td><input type="checkbox" className="btn-check" id="fajr-sun" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="fajr-sun"></label></td>
        </tr>
        <tr>
          <td>Dhuhr</td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-mon" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-mon"></label></td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-tue" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-tue"></label></td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-wed" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-wed"></label></td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-thu" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-thu"></label></td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-fri" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-fri"></label></td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-sat" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-sat"></label></td>
          <td><input type="checkbox" className="btn-check" id="dhuhr-sun" autoComplete="off"/>
              <label className="btn btn-outline-success btn-toggle" htmlFor="dhuhr-sun"></label></td>
        </tr>
        <tr>
          <td>Asr</td>
          <td><input type="checkbox" className="btn-check" id="asr-mon" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-mon"></label></td>
          <td><input type="checkbox" className="btn-check" id="asr-tue" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-tue"></label></td>
          <td><input type="checkbox" className="btn-check" id="asr-wed" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-wed"></label></td>
          <td><input type="checkbox" className="btn-check" id="asr-thu" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-thu"></label></td>
          <td><input type="checkbox" className="btn-check" id="asr-fri" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-fri"></label></td>
          <td><input type="checkbox" className="btn-check" id="asr-sat" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-sat"></label></td>
          <td><input type="checkbox" className="btn-check" id="asr-sun" autoComplete="off"/>
              <label className="btn btn-outline-warning btn-toggle" htmlFor="asr-sun"></label></td>
        </tr>
        <tr>
          <td>Maghrib</td>
          <td><input type="checkbox" className="btn-check" id="maghrib-mon" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-mon"></label></td>
          <td><input type="checkbox" className="btn-check" id="maghrib-tue" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-tue"></label></td>
          <td><input type="checkbox" className="btn-check" id="maghrib-wed" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-wed"></label></td>
          <td><input type="checkbox" className="btn-check" id="maghrib-thu" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-thu"></label></td>
          <td><input type="checkbox" className="btn-check" id="maghrib-fri" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-fri"></label></td>
          <td><input type="checkbox" className="btn-check" id="maghrib-sat" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-sat"></label></td>
          <td><input type="checkbox" className="btn-check" id="maghrib-sun" autoComplete="off"/>
              <label className="btn btn-outline-danger btn-toggle" htmlFor="maghrib-sun"></label></td>
        </tr>
        <tr>
          <td>Isha</td>
          <td><input type="checkbox" className="btn-check" id="isha-mon" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-mon"></label></td>
          <td><input type="checkbox" className="btn-check" id="isha-tue" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-tue"></label></td>
          <td><input type="checkbox" className="btn-check" id="isha-wed" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-wed"></label></td>
          <td><input type="checkbox" className="btn-check" id="isha-thu" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-thu"></label></td>
          <td><input type="checkbox" className="btn-check" id="isha-fri" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-fri"></label></td>
          <td><input type="checkbox" className="btn-check" id="isha-sat" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-sat"></label></td>
          <td><input type="checkbox" className="btn-check" id="isha-sun" autoComplete="off"/>
              <label className="btn btn-outline-dark btn-toggle" htmlFor="isha-sun"></label></td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>


  )
}
