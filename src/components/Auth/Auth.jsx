import React from 'react';
import ThemeSignInPage from './ThemeSignInPage';

export default function Auth({ show,handleClose }) {
  return (
    <>
      {show && (
        <div>
          <ThemeSignInPage handleClose={handleClose}/>    
        </div>
      )}
    </>
  );
}
