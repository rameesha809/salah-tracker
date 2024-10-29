import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import { getDesignTokens } from './brandingTheme';
import { IconButton } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close'; 
import 'animate.css'; 

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
];

const signIn = async (provider) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve();
    }, 500);
  });
};

export default function ThemeSignInPage({ handleClose }) {
  const [mode, setMode] = useState('light'); 
  const modalRef = useRef(null); 

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setMode(e.matches ? 'dark' : 'light'); 
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, handleClose]);

  const brandingDesignTokens = getDesignTokens(mode);
  const THEME = createTheme({
    ...brandingDesignTokens,
    palette: {
      ...brandingDesignTokens.palette,
      mode,
      primary: {
        main: '#12467B',
      },
    },
  });

  return (
    <AppProvider theme={THEME}>
      <div 
        ref={modalRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1000,
          backdropFilter: 'blur(5px)', 
          animation: 'fadeIn', 
          animationDuration: '0.5s'
        }}
      >
        <div 
          style={{ 
            position: 'relative', 
            backgroundColor: 'white', 
            padding: '20px',
            height: '90%', 
            borderRadius: '8px', 
            width: '400px', 
            animation: 'zoomIn', 
            animationDuration: '0.5s'
          }}
        >
          <IconButton 
            style={{ position: 'absolute', top: 5, right: 5 }} 
            onClick={handleClose} 
          >
            <CloseIcon />
          </IconButton>
          <SignInPage 
            signIn={async (provider) => {
              await signIn(provider);
              handleClose(); 
            }} 
            providers={providers} 
          />
        </div>
      </div>
    </AppProvider>
  );
}
