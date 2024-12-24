import { configureStore } from '@reduxjs/toolkit';

import workoutReducer from './features/workouts/workoutSlice';
import timerReducer from './features/timer/timerSlice';

const store = configureStore({
   reducer: {
      workouts: workoutReducer,
      timer: timerReducer,
   },
});

export default store;
