import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   resetState,
   addWorkoutToState,
} from '../features/workouts/workoutSlice';

import BackButton from './BackButton';
import MainButton from './MainButton';
import PresetInput from './PresetInput';

function SaveWorkout({ closeModal }) {
   const [searchEmpty, setSearchEmpty] = useState(false);

   const { name, sets, work, rest } = useSelector((store) => store.workouts);
   const btnEl = useRef(null);
   const dispatch = useDispatch();

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
      <>
         <div className="bg-neutral-200 flex relative px-20 sm:px-12 pt-24 pb-12 rounded-t-3xl">
            <PresetInput />
            <span className="fixed top-1 right-2 sm:right-5 opacity-75">
               <BackButton handler={closeModal} />
            </span>
         </div>
         <MainButton
            setPath={name && `/presets`}
            handler={handleCreateWorkout}
            styles="text-[2.6rem] sm:text-4xl p-8 sm:p-4 sm:py-6 rounded-b-3xl"
            element={btnEl}
         >
            {!searchEmpty ? '+ Create new workout' : 'No name found!'}
         </MainButton>
      </>
   );
}

export default SaveWorkout;
