import { configureStore } from '@reduxjs/toolkit';
import islamicDateReducer from './IslamicDateTimeSlice';
import prayerSlice from './PrayerSlice';
import missingPrayersSlice from './MissingPrayers';
import AdhkarApiSlice from './AdhkarSlice';
import SignInSlice from './SignInSlice';

const store = configureStore({
  reducer: {
    islamicDateTime: islamicDateReducer, 
    adhkar: AdhkarApiSlice, 
    prayer: prayerSlice,
    missing: missingPrayersSlice,
    auth: SignInSlice,
  },
});

export default store; 
