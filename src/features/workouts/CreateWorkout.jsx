import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   resetState,
   setName,
   addWorkoutToState,
} from '../workouts/workoutSlice';

import BackButton from '../../components/BackButton';
import Inputs from '../../components/Inputs';
import MainButton from '../../components/MainButton';

function CreateWorkout() {
   const [searchEmpty, setSearchEmpty] = useState(false);
   const btnEl = useRef(null);

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

   // - Disable button and show error message if input is empty when button is clicked
   useEffect(() => {
      if (searchEmpty) {
         const btnElement = btnEl.current;
         btnElement.classList.add('failed-save');
         btnElement.classList.add('hover:failed-save-hover');

         const i = setTimeout(() => {
            btnElement.classList.remove('failed-save');
            btnElement.classList.remove('hover:failed-save-hover');

            setSearchEmpty(false);
         }, 3000);

         return function () {
            clearTimeout(i);
         };
      }
   }, [searchEmpty]);

   return (
      <form className="flex flex-col gap-10 sm:gap-6">
         <BackButton setPath="/" />
         <PresetInput />
         <Inputs />
         <MainButton
            setPath={name && `/presets`}
            handler={handleCreateWorkout}
            element={btnEl}
         >
            {!searchEmpty ? '+ Save workout' : 'No name found!'}
         </MainButton>
      </form>
   );
}

function PresetInput() {
   const dispatch = useDispatch();
   const { name } = useSelector((store) => store.workouts);

   return (
      <div className="flex flex-col self-center text-center w-2/5 sm:w-1/2 gap-2 mt-[-60px]">
         <span className="text-3xl sm:text-2xl">Preset name</span>
         <input
            className="text-2xl sm:text-xl rounded-full bg-neutral-200 p-2 sm:p-[0.4rem] pl-5 sm:pl-4 text-neutral-600"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
         />
      </div>
   );
}
export default CreateWorkout;
