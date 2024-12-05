import { configureStore } from '@reduxjs/toolkit';
import islamicDateReducer from './IslamicDateTimeSlice';
import prayerSlice from './PrayerSlice';
import missingPrayersSlice from './MissingPrayers';
import AdhkarApiSlice from './AdhkarSlice';
import SignInSlice from './SignInSlice';
import savedHadithReducer from './savedHadithSlice';

const store = configureStore({
  reducer: {
    islamicDateTime: islamicDateReducer, 
    adhkar: AdhkarApiSlice, 
    prayer: prayerSlice,
    missing: missingPrayersSlice,
    auth: SignInSlice,
    savedHadith: savedHadithReducer
  },
});

export default store; 
