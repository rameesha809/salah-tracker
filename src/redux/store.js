import { configureStore } from '@reduxjs/toolkit';
import islamicDateReducer from './IslamicDateTimeSlice';
import prayerSlice from './PrayerSlice';
import AdhkarApiSlice from './AdhkarSlice';

const store = configureStore({
  reducer: {
    islamicDateTime: islamicDateReducer, 
    adhkar: AdhkarApiSlice, 
    prayer: prayerSlice,
  },
});

export default store; 
