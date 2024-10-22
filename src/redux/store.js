import { configureStore } from '@reduxjs/toolkit';
import islamicDateReducer from './IslamicDateTimeSlice';
import AdhkarApiSlice from './AdhkarSlice';

const store = configureStore({
  reducer: {
    islamicDateTime: islamicDateReducer, 
    adhkar: AdhkarApiSlice, 
  },
});

export default store; 
