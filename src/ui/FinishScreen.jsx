import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetScreens } from '../features/timer/timerSlice';
import { resetSelectedWorkout } from '../features/workouts/workoutSlice';

import MainButton from './buttons/MainButton';
import photo from '../../public/congratulation.png';

function FinishScreen() {
   const navigate = useNavigate();
   const workoutDispatch = useDispatch();
   const timerDispatch = useDispatch();

   function handleWorkoutExit() {
      workoutDispatch(resetSelectedWorkout());
      timerDispatch(resetScreens());
      navigate(-2);
   }

   return (
      <div>
         <div className="flex flex-col p-12 sm:p-10 bg-gradient-to-tl from-[#9e9e9e] to-gray-300 text-center rounded-t-3xl">
            <div className="flex items-center justify-center sm:gap-4">
               <img className="w-1/3 opacity-75" src={photo} alt="Logo" />
               <h2 className="font-black text-neutral-700 italic sm:text-3xl">
                  You finished your workout!
               </h2>
            </div>
         </div>
         <span>
            <MainButton
               styles="text-5xl sm:text-[2.6rem] p-6 rounded-b-3xl"
               handler={handleWorkoutExit}
            >
               Return »
            </MainButton>
         </span>
      </div>
   );
}

export default FinishScreen;
