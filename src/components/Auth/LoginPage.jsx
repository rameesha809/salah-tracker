import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage'; // You might want to create a separate login page if necessary
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getDesignTokens } from './brandingTheme';

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
];

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Logging in with ${provider.id}`);
      resolve();
    }, 500);
  });
  return promise;
};

export default function ThemeLoginPage() {
  const [mode, setMode] = useState('light'); // Default to light mode
  const [systemMode, setSystemMode] = useState('light'); // For detecting system preference

  // Effect to check system color scheme (optional)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setSystemMode(e.matches ? 'dark' : 'light');
      setMode(e.matches ? 'dark' : 'light'); // Update mode based on system preference
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const brandingDesignTokens = getDesignTokens(mode);
  const THEME = createTheme({
    ...brandingDesignTokens,
    palette: {
      ...brandingDesignTokens.palette,
      mode,
    },
  });

  return (
    <AppProvider theme={THEME}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
