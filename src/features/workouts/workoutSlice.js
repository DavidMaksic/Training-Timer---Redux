import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   name: '',
   sets: 3,
   work: 0.01,
   rest: 0.05,
   workouts: [],
   selectedWorkoutCopy: {},
};

const workoutSlice = createSlice({
   name: 'workout',
   initialState,
   reducers: {
      resetState(state) {
         state.name = '';
         state.sets = 3;
         state.work = 0.01;
         state.rest = 0.05;
      },
      setName(state, action) {
         state.name = action.payload;
      },
      addWorkoutToState(state, action) {
         state.workouts = [...state.workouts, action.payload];
      },
      loadSelectedWorkout(state, action) {
         state.selectedWorkout = action.payload;
         state.selectedWorkoutCopy = action.payload;
      },
      deletePreset(state, action) {
         state.workouts = state.workouts.filter(
            (item) => item.id !== action.payload
         );
      },
      setsDecrease(state) {
         if (state.sets === 1) return;
         state.sets -= 1;
      },
      setsIncrease(state) {
         state.sets += 1;
      },
      workDecrease(state) {
         if (state.work === 1) return;
         state.work -= 1;
      },
      workIncrease(state) {
         state.work += 1;
      },
      restDecrease(state) {
         if (state.rest === 0.5) return;
         state.rest -= 0.5;
      },
      restIncrease(state) {
         state.rest += 0.5;
      },
      decreaseCurrentSet(state) {
         state.sets -= 1;
      },
      increaseSelectedWorkout(state) {
         state.selectedWorkoutCopy.sets += 1;
      },
      decreaseSelectedWorkout(state) {
         state.selectedWorkoutCopy.sets -= 1;
      },
      resetSelectedWorkout(state) {
         state.selectedWorkoutCopy.sets = state.selectedWorkout?.sets;
      },
      increaseTimerSet(state) {
         state.sets += 1;
      },
      decreaseTimerSet(state) {
         state.sets -= 1;
      },
   },
});

export const {
   resetState,
   setName,
   addWorkoutToState,
   loadSelectedWorkout,
   deletePreset,
   setsDecrease,
   setsIncrease,
   workDecrease,
   workIncrease,
   restDecrease,
   restIncrease,
   decreaseCurrentSet,
   increaseSelectedWorkout,
   decreaseSelectedWorkout,
   resetSelectedWorkout,
   increaseTimerSet,
   decreaseTimerSet,
} = workoutSlice.actions;

export default workoutSlice.reducer;
