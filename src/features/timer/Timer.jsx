import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { calcTotalSeconds } from '../../utils/helpers';

import {
   togglePrepareScreen,
   toggleWorkingScreen,
   toggleRestingScreen,
   currentSetDone,
} from './timerSlice';

import useCountdown from '../../hooks/useCountdown';
import BackButton from '../../ui/buttons/BackButton';
import PauseButton from '../../ui/buttons/PauseButton';
import SkipSetButton from '../../ui/buttons/SkipSetButton';
import useSkipSet from '../../hooks/useSkipSet';
import useWorkoutFinished from '../../hooks/useWorkoutFinished';
import useDisplayTime from '../../hooks/useDisplayTime';
import useDecreaseSet from '../../hooks/useDecreaseSet';

function Timer() {
   const PREPARE_SEC = 5;
   const { id } = useParams();
   const location = useLocation();
   const timerDispatch = useDispatch();
   const { skipSet } = useSkipSet();

   // - State data
   const { sets, work, rest, selectedWorkout, selectedWorkoutCopy } =
      useSelector((store) => store.workouts);
   const { isPreparing, isWorking, isResting, mins, seconds, finishedSet } =
      useSelector((store) => store.timer);

   // - Countdown data
   const {
      startPrepareTimer,
      startWorkTimer,
      startRestTimer,
      prepareSeconds,
      workSeconds,
      restSeconds,
      isPaused,
      setIsPaused,
   } = useCountdown();

   // - Displaying minutes and seconds
   useDisplayTime(prepareSeconds, workSeconds, restSeconds);

   // - Decrease current set
   useDecreaseSet(restSeconds, id);

   // - This hook listens if the workout is finished
   useWorkoutFinished(isPaused, sets, selectedWorkoutCopy, setIsPaused);

   // 1.) Show prepare screen
   useEffect(() => {
      startPrepareTimer(PREPARE_SEC);
   }, [startPrepareTimer]);

   // 2.) Show working screen
   useEffect(() => {
      if (prepareSeconds === 0) {
         timerDispatch(togglePrepareScreen(false));
         timerDispatch(toggleWorkingScreen(true));
         const type = 'work';

         if (id) {
            const totalSeconds = calcTotalSeconds(selectedWorkout.work, type);
            startWorkTimer(totalSeconds);
         } else {
            const totalSeconds = calcTotalSeconds(work, type);
            startWorkTimer(totalSeconds);
         }

         const i = setTimeout(() => {
            if (finishedSet) {
               timerDispatch(currentSetDone(false));
            }
         }, 1);

         return () => clearTimeout(i);
      }
   }, [
      prepareSeconds,
      work,
      id,
      selectedWorkout,
      finishedSet,
      timerDispatch,
      startWorkTimer,
   ]);

   // 3.) Show resting screen
   useEffect(() => {
      if (workSeconds === 0 && isWorking && !finishedSet) {
         timerDispatch(toggleWorkingScreen(false));
         timerDispatch(toggleRestingScreen(true));
         const type = 'rest';

         if (id) {
            const totalSeconds = calcTotalSeconds(selectedWorkout.rest, type);
            startRestTimer(totalSeconds);
         } else {
            const totalSeconds = calcTotalSeconds(rest, type);
            startRestTimer(totalSeconds);
         }
      }
   }, [
      workSeconds,
      isWorking,
      rest,
      id,
      finishedSet,
      selectedWorkout,
      startRestTimer,
      timerDispatch,
   ]);

   return (
      <div
         className={`flex flex-col pb-5 gap-8 sm:gap-28 ${
            isPreparing && 'bg-yellow-500 '
         } ${isWorking && 'bg-green-400'} ${isResting && 'bg-violet-400'} ${
            isPreparing && isPaused ? 'bg-yellowPaused' : ''
         } ${isWorking && isPaused ? 'bg-green-500' : ''} ${
            isResting && isPaused ? 'bg-violetPaused' : ''
         } ${
            location.pathname.includes('/timer')
               ? 'sm:pt-[2rem] sm:pb-[20rem]'
               : ''
         }`}
      >
         <div className="flex justify-between">
            <PauseButton setIsPaused={setIsPaused} isPaused={isPaused} />
            <BackButton styles="self-end pr-5 pt-1" />
         </div>

         <div className="flex flex-col items-center justify-center gap-20 sm:gap-8 pb-20">
            <div className="flex gap-10 sm:gap-6 items-center">
               <SkipSetButton handler={() => skipSet(isPaused, id, 'back')}>
                  ⏮
               </SkipSetButton>
               <span className="text-7xl sm:text-6xl">
                  {id ? selectedWorkoutCopy.sets : sets}x
               </span>
               <SkipSetButton handler={() => skipSet(isPaused, id, 'forward')}>
                  ⏭
               </SkipSetButton>
            </div>

            <span className="text-[9.5rem] sm:text-9xl">
               {mins < 10 && '0'}
               {mins}
               {':'}
               {seconds < 10 && '0'}
               {seconds}
            </span>

            <span
               className={`text-5xl font-black ${
                  isPreparing && 'text-yellow-200'
               } ${isWorking && 'text-green-200'} ${
                  isResting && 'text-[#cdc7e8]'
               } ${isPreparing && isPaused ? 'text-yellowTextPaused' : ''} ${
                  isWorking && isPaused ? 'text-green-300' : ''
               } ${isResting && isPaused ? 'text-violetTextPaused' : ''}`}
            >
               {isPreparing && 'PREPARE'}
               {isWorking && 'WORK'}
               {isResting && 'REST'}
            </span>
         </div>
      </div>
   );
}

export default Timer;
