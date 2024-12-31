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
      setTime(state, action) {
         state.mins = Math.floor(action.payload / 60);
         state.seconds = action.payload % 60;
      },
      currentSetDone(state, action) {
         state.finishedSet = action.payload;
         if (action.payload) state.isResting = false;
      },
   },
});

export const {
   resetScreens,
   togglePrepareScreen,
   toggleWorkingScreen,
   toggleRestingScreen,
   setTime,
   currentSetDone,
} = timerSlice.actions;

export default timerSlice.reducer;
