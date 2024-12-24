import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isPreparing: true,
   isWorking: false,
   isResting: false,
   finishedSet: false,
   isFinished: false,
   mins: 0,
   seconds: 0,
};

const timerSlice = createSlice({
   name: 'timer',
   initialState,
   reducers: {
      resetScreens(state) {
         state.isPreparing = true;
         state.isWorking = false;
         state.isResting = false;
      },
      togglePrepareScreen(state, action) {
         state.isPreparing = action.payload;
      },
      toggleWorkingScreen(state, action) {
         state.isWorking = action.payload;
      },
      toggleRestingScreen(state, action) {
         state.isResting = action.payload;
      },
      setMins(state, action) {
         state.mins = Math.floor(action.payload / 60);
      },
      setSeconds(state, action) {
         state.seconds = action.payload % 60;
      },
      currentSetDone(state, action) {
         state.finishedSet = action.payload;
      },
      workoutFinished(state) {
         state.isFinished = !state.isFinished;
      },
   },
});

export const {
   togglePrepareScreen,
   toggleWorkingScreen,
   toggleRestingScreen,
   setMins,
   setSeconds,
   currentSetDone,
   workoutFinished,
   resetScreens,
} = timerSlice.actions;

export default timerSlice.reducer;
