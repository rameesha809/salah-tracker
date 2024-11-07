import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Docs() {
  return (
    <div>
     
      {/* Main Content */}
      <Container sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom color="#12467B">
            Documentation - Salah Tracker
          </Typography>
          <Typography variant="body1" paragraph>
            The Salah Tracker is a tool designed to help users keep track of their daily prayers, monitor their progress, 
            and stay consistent with their prayer schedule. This website aims to support Muslims in maintaining their Salah 
            (prayer) by providing a simple, intuitive interface to track daily prayers and review past records.
          </Typography>

          <Typography variant="h5" gutterBottom color="#12467B">
            Key Features
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1. Track Daily Prayers" secondary="Keep track of each prayer throughout the week for Fajr, Dhuhr, Asr, Maghrib, and Isha." />
            </ListItem>
            
            <ListItem>
              <ListItemText primary="2. Browse Renowned Hadith Books" secondary="Browse dfferent hadith books in three different languages and save for later." />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. Login for Personal Records" secondary="Sign in to save your progress and view your records." />
            </ListItem>
            <ListItem>
              <ListItemText primary="4. Celebration upon Completion" secondary="Confetti animation upon completing all prayers in a week to encourage consistency." />
            </ListItem>
            <ListItem>
              <ListItemText primary="5. Get Islamic Date" secondary="view islamic date, month, and year on the landing page to keep track of islamic calendar." />
            </ListItem>
          </List>
        </Paper>
      </Container>

    </div>
  );
}
