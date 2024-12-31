import { useDispatch } from 'react-redux';
import {
   decreaseSelectedWorkout,
   decreaseTimerSet,
   increaseSelectedWorkout,
   increaseTimerSet,
} from '../features/workouts/workoutSlice';

function useSkipSet() {
   const workoutDispatch = useDispatch();

   function skipSet(isPaused, id, type) {
      if (isPaused) return;

      if (type === 'back') {
         if (id) return workoutDispatch(decreaseSelectedWorkout());
         workoutDispatch(decreaseTimerSet());
      }
      if (type === 'forward') {
         if (id) return workoutDispatch(increaseSelectedWorkout());
         workoutDispatch(increaseTimerSet());
      }
   }

   return { skipSet };
}

export default useSkipSet;
