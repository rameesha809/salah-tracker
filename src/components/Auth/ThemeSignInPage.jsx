import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import { getDesignTokens } from './brandingTheme';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { signIn } from '../../redux/SignInSlice';
import 'animate.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
];
export default function ThemeSignInPage({ handleClose, onLoginSuccess }) {
  const [mode, setMode] = useState('light');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  console.log("error:", error);
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
  const filteredProviders = providers.filter((provider) => provider.id === 'credentials');

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
            height: '75%',
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
            signIn={async (provider, formData) => {
              console.log('Provider:', provider);
              console.log('Form Data:', formData);
  
              if (provider.id === 'credentials') {
                const email = formData.get('email');
                const password = formData.get('password');
  
                const username = email ? email.split('@')[0] : '';
                try {
                  // Dispatch the signIn action and wait for the response
                  const resultAction = await dispatch(signIn({ provider, username, email, password }));
          
                  // Check if the action was fulfilled (successful login)
                  if (signIn.fulfilled.match(resultAction)) {
                    onLoginSuccess(username); // Trigger on success
                    handleClose(); // Close modal on success
                  } else {
                    // In case of failure, don't close the modal
                    console.log("Sign-in error:", resultAction.payload || resultAction.error);
                  }
                } catch (error) {
                  console.log("Sign-in error:", error);
                  // Don't close the modal on failure
                }
              }  else {
                await dispatch(signIn({ provider }))
                .then(() => {
                  handleClose(); // Close modal on success
                })
                .catch((error) => {
                  // Handle error if needed
                });
              }
            }}
            providers={filteredProviders}
          />
          
          {error && (
            <div style={{ color: 'red' }}>
              {error === 'Invalid password' ? 'The password you entered is incorrect.' : "Invalid credentials or Email username already taken"}
            </div>
          )}
        </div>
      </div>
    </AppProvider>
  );
}
