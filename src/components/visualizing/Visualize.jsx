import Choice from './Choice';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissedPrayers, fetchOfferedPrayers } from '../../redux/MissingPrayers';
export default function Visualize() {
  const dispatch = useDispatch();
  const [selectedChoice, setSelectedChoice] = useState('Prayed');
  const initialRows = [
    { id: 1, salah: 'Fajr', missed: 0, offered: 5 },
    { id: 2, salah: 'Dhuhr', missed: 0, offered: 5 },
    { id: 3, salah: 'Asr', missed: 0, offered: 5 },
    { id: 4, salah: 'Maghrib', missed: 0, offered: 5 },
    { id: 5, salah: 'Isha', missed: 0, offered: 5 },
  ];
  const prayerColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ];
  const [rows, setRows] = useState(initialRows);
  useEffect(() => {
    dispatch(fetchMissedPrayers(10));
    dispatch(fetchOfferedPrayers(10));
  }, [dispatch]);
  const { missedPrayers, offeredPrayers } = useSelector((state) => {
    console.log("Current missed prayers state:", state.missing.missedPrayers);
    console.log("Current offered prayers state:", state.missing.offeredPrayers);
    return {
      missedPrayers: state.missing.missedPrayers,
      offeredPrayers: state.missing.offeredPrayers,
    };
  });

  useEffect(() => {
    console.log("Missed Prayers:", missedPrayers);
    console.log("Offered Prayers:", offeredPrayers);
    if (missedPrayers) {
      const updatedRows = initialRows.map((row) => ({
        ...row,
        missed: missedPrayers[row.salah.toLowerCase()] !== undefined ? missedPrayers[row.salah.toLowerCase()] : row.missed,
        offered: offeredPrayers[row.salah.toLowerCase()] !== undefined ? offeredPrayers[row.salah.toLowerCase()] : row.offered,
      }));
      setRows(updatedRows);
    }
  }, [missedPrayers, offeredPrayers]);
  const getPrayedData = () => {
    return rows.map(row => row.prayed);
  };
  const getOfferedData = () => rows.map((row) => row.offered);
  const getMissedData = () => {
    return rows.map(row => row.missed);
  };
  const prayedData = {
    labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    datasets: [
      {
        label: 'Prayed Salahs',
        data: getPrayedData(),
        backgroundColor: prayerColors,
      },
    ],
  };
  
  const missedData = {
    labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    datasets: [
      {
        label: 'Missed Salahs',
        data: getMissedData(),
        backgroundColor: prayerColors,
      },
    ],
  };
  const offeredData = {
    labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    datasets: [
      {
        label: 'Offered Salahs',
        data: getOfferedData(),
        backgroundColor: prayerColors,
      },
    ],
  };
  console.log('Selected Choice in Visualize:', selectedChoice);
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ minHeight: '100vh', marginTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
        <Choice setSelectedChoice={setSelectedChoice} />
        <div style={{ marginTop: '50px', paddingBottom: '50px', width: '100%', height: '300px', display: 'flex', justifyContent: 'center' }}>
          {selectedChoice === 'Prayed' && (
            <Bar data={offeredData} />
          )}
          {selectedChoice === 'Missed' && (
            <Bar data={missedData} />
          )}
        </div>
        <div style={{ marginTop: '50px', width: '100%', marginBottom: '50px', height: '300px', display: 'flex', justifyContent: 'center' }}>
          {selectedChoice === 'Prayed' && (
            <Doughnut data={offeredData} />
          )}
          {selectedChoice === 'Missed' && (
            <Doughnut data={missedData} />
          )}
        </div>
      </div>

    </div>
  )
}
