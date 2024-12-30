import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   addWorkoutToState,
   resetState,
} from '../features/workouts/workoutSlice';

function useCreateWorkout() {
   const [searchEmpty, setSearchEmpty] = useState(false);
   const dispatch = useDispatch();

   const { name, sets, work, rest } = useSelector((store) => store.workouts);

   const handleCreateWorkout = function () {
      const workout = {
         name,
         sets,
         work,
         rest,
         id: Date.now(),
      };

      // - If name input is empty
      if (!name) return setSearchEmpty(true);

      dispatch(addWorkoutToState(workout));
      dispatch(resetState());
   };
   return { name, searchEmpty, setSearchEmpty, handleCreateWorkout };
}

export default useCreateWorkout;
