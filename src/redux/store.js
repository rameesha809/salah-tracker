import { configureStore } from '@reduxjs/toolkit';
import islamicDateReducer from './IslamicDateTimeSlice';
import prayerSlice from './PrayerSlice';
import missingPrayersSlice from './MissingPrayers';
import AdhkarApiSlice from './AdhkarSlice';

const store = configureStore({
  reducer: {
    islamicDateTime: islamicDateReducer, 
    adhkar: AdhkarApiSlice, 
    prayer: prayerSlice,
    missing: missingPrayersSlice,
  },
});

export default store; 
