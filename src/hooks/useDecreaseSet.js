import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentSetDone } from '../features/timer/timerSlice';
import {
   decreaseCurrentSet,
   decreaseSelectedWorkout,
} from '../features/workouts/workoutSlice';

function useDecreaseSet(restSeconds, id) {
   const timerDispatch = useDispatch();
   const workoutDispatch = useDispatch();

   useEffect(() => {
      if (restSeconds === 0) {
         timerDispatch(currentSetDone(true));
         if (!id) workoutDispatch(decreaseCurrentSet());
         if (id) workoutDispatch(decreaseSelectedWorkout());
      }
   }, [restSeconds, id, timerDispatch, workoutDispatch]);
}

export default useDecreaseSet;
