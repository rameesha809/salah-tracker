import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { fetchMissedPrayers } from '../../redux/MissingPrayers';
import { useDispatch, useSelector } from 'react-redux';
const SalahTable = () => {
  const initialRows = [
    { id: 1, salah: 'Fajr', missed: 0 },
    { id: 2, salah: 'Dhuhr', missed: 0 },
    { id: 3, salah: 'Asr', missed: 0 },
    { id: 4, salah: 'Maghrib', missed: 0 },
    { id: 5, salah: 'Isha', missed: 0 },
  ];
  const dispatch = useDispatch();
  const { missedPrayers, loading, error } = useSelector((state) => {
    console.log("Current prayers state:", state.missing.missedPrayers);
    return state.missing || {}});
  useEffect(() => {
      dispatch(fetchMissedPrayers(10));
  }, [dispatch]);
  const [rows, setRows] = useState(initialRows);
  const [editRowId, setEditRowId] = useState(null);
  const [editMissed, setEditMissed] = useState(null);
  useEffect(() => {
    console.log("Missed Prayers:", missedPrayers);
    if (missedPrayers) {
      const updatedRows = initialRows.map((row) => ({
        ...row,
        missed: missedPrayers[row.salah.toLowerCase()] !== undefined ? missedPrayers[row.salah.toLowerCase()] : row.missed,
      }));
      setRows(updatedRows);
    }
  }, [missedPrayers]);
  const handleEditClick = (id, missed) => {
    setEditRowId(id);
    setEditMissed(missed);
  };

  const handleInputChange = (event) => {
    setEditMissed(event.target.value);
  };

  const handleKeyPress = (event, id) => {
    if (event.key === 'Enter') {
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, missed: editMissed } : row
      );
      setRows(updatedRows);
      setEditRowId(null);
    }
  };

  const handleBlur = () => {
    setEditRowId(null);
  };

  
  return (
    <div className='container-outer' style={{color:'white'}}>
      <div className="container mt-7 d-flex flex-column align-items-center">
      <h1 className="text-center mb-4">Missed Salahs</h1>
      <table className="table table-two table-bordered text-center" style={{backgroundColor:'#6170af'}}>
        <thead className="table-primary rounded-pill">
        <tr className="rounded-pill">
            <th className="rounded-start">Prayer</th>
            <th className="rounded-end">Missed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={styles.cell}>{row.salah}</td>
              <td style={styles.cell}>
                {editRowId === row.id ? (
                  <input
                    type="number"
                    value={editMissed}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, row.id)}
                    onBlur={handleBlur}
                    autoFocus
                    style={styles.input}
                  />
                ) : (
                  <div className='d-flex justify-content-center ' style={styles.editableCell}>
                    <span className='spanofmissed'>{row.missed}</span>
                    <FaEdit
                      onClick={() => handleEditClick(row.id, row.missed)}
                      style={styles.editIcon}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const styles = {
  
  editableCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  editIcon: {
    marginLeft: '5px',
    cursor: 'pointer',
    color: 'white',
  },
  input: {
    width: '50%',
    textAlign: 'center',
    backgroundColor: '#001f3f',
    border: 'none',
    color: 'white',
    outline: 'none',
  },
};

export default SalahTable;
