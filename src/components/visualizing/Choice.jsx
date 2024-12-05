import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function Choice({ setSelectedChoice }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (choice) => {
    setAnchorEl(null);
    if (choice) {
        console.log('Selected Choice:', choice);
      setSelectedChoice(choice);
    }
  };
  return (
    <div>
      <Button
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Select Salah Status
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
      >
        <MenuItem onClick={() => handleClose('Prayed')}>Prayed</MenuItem>
        <MenuItem onClick={() => handleClose('Missed')}>Missed</MenuItem>
      </Menu>
    </div>
  );
}
