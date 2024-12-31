import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { calcTotalSeconds } from '../../utils/helpers';

import {
   decreaseTimerSet,
   increaseTimerSet,
   decreaseCurrentSet,
   increaseSelectedWorkout,
   decreaseSelectedWorkout,
} from '../workouts/workoutSlice';
import {
   setMins,
   setSeconds,
   togglePrepareScreen,
   toggleWorkingScreen,
   toggleRestingScreen,
   currentSetDone,
} from './timerSlice';

import useCountdown from '../../hooks/useCountdown';
import BackButton from '../../ui/buttons/BackButton';
import PauseButton from '../../ui/buttons/PauseButton';
import SkipSetButton from '../../ui/buttons/SkipSetButton';

function Timer() {
   const PREPARE_SEC = 5;
   const { id } = useParams();
   const location = useLocation();
   const navigate = useNavigate();

   const workoutDispatch = useDispatch();
   const timerDispatch = useDispatch();

   const { sets, work, rest, selectedWorkout, selectedWorkoutCopy } =
      useSelector((store) => store.workouts);

   const { isPreparing, isWorking, isResting, mins, seconds, finishedSet } =
      useSelector((store) => store.timer);

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

   // - Show prepare screen
   useEffect(() => {
      startPrepareTimer(PREPARE_SEC);
   }, [startPrepareTimer]);

   // - Show working screen
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

   // - Show resting screen
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

   // - Displaying minutes and seconds
   useEffect(() => {
      timerDispatch(setMins(prepareSeconds));
      timerDispatch(setSeconds(prepareSeconds));
   }, [prepareSeconds, timerDispatch]);

   useEffect(() => {
      timerDispatch(setMins(workSeconds));
      timerDispatch(setSeconds(workSeconds));
   }, [workSeconds, timerDispatch]);

   useEffect(() => {
      timerDispatch(setMins(restSeconds));
      timerDispatch(setSeconds(restSeconds));
   }, [restSeconds, timerDispatch]);

   // - Decrease current set
   useEffect(() => {
      if (restSeconds === 0) {
         timerDispatch(currentSetDone(true));
         timerDispatch(toggleRestingScreen(false));

         if (!id) workoutDispatch(decreaseCurrentSet());
         if (id) {
            workoutDispatch(decreaseSelectedWorkout());
         }
      }
   }, [restSeconds, id, timerDispatch, workoutDispatch]);

   // - Logic used when timer runs out
   useEffect(() => {
      if (isPaused) return;
      if (sets === 0 || selectedWorkoutCopy?.sets === 0) {
         setIsPaused((isPaused) => !isPaused);
         navigate('/finish-screen');
      }
   }, [sets, isPaused, selectedWorkoutCopy, setIsPaused, navigate]);

   // - Logic for skipping a set
   function handleDec() {
      if (isPaused) return;
      // - If custom workout exits:
      if (id) {
         return workoutDispatch(decreaseSelectedWorkout());
      }
      // - Otherwise:
      workoutDispatch(decreaseTimerSet());
   }

   function handleInc() {
      if (isPaused) return;
      if (id) {
         return workoutDispatch(increaseSelectedWorkout());
      }
      workoutDispatch(increaseTimerSet());
   }

   // - Complex styles

   const timerStyle = `flex flex-col pb-5 gap-8 sm:gap-28 ${
      isPreparing && 'bg-yellow-500 '
   } ${isWorking && 'bg-green-400'} ${isResting && 'bg-violet-400'} ${
      isPreparing && isPaused ? 'bg-yellowPaused' : ''
   } ${isWorking && isPaused ? 'bg-green-500' : ''} ${
      isResting && isPaused ? 'bg-violetPaused' : ''
   } ${
      location.pathname.includes('/timer') ? 'sm:pt-[2rem] sm:pb-[20rem]' : ''
   }`;

   const messageStyle = `text-5xl font-black ${
      isPreparing && 'text-yellow-200'
   } ${isWorking && 'text-green-200'} ${isResting && 'text-[#cdc7e8]'} ${
      isPreparing && isPaused ? 'text-yellowTextPaused' : ''
   } ${isWorking && isPaused ? 'text-green-300' : ''} ${
      isResting && isPaused ? 'text-violetTextPaused' : ''
   }`;

   return (
      <div className={timerStyle}>
         <div className="flex justify-between">
            <PauseButton setIsPaused={setIsPaused} isPaused={isPaused} />
            <BackButton styles="self-end pr-5 pt-1" />
         </div>

         <div className="flex flex-col items-center justify-center gap-20 sm:gap-8 pb-20">
            <div className="flex gap-10 sm:gap-6 items-center">
               <SkipSetButton handler={handleDec}>⏮</SkipSetButton>
               <span className="text-7xl sm:text-6xl">
                  {id ? selectedWorkoutCopy.sets : sets}x
               </span>
               <SkipSetButton handler={handleInc}>⏭</SkipSetButton>
            </div>

            <span className="text-[9.5rem] sm:text-9xl">
               {mins < 10 && '0'}
               {mins}
               {':'}
               {seconds < 10 && '0'}
               {seconds}
            </span>

            <span className={messageStyle}>
               {isPreparing && 'PREPARE'}
               {isWorking && 'WORK'}
               {isResting && 'REST'}
            </span>
         </div>
      </div>
   );
}

export default Timer;
