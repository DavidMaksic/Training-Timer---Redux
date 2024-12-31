import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

import { calcAllSeconds } from '../../utils/helpers';
import { GrPauseFill } from 'react-icons/gr';
import { IoPlaySharp } from 'react-icons/io5';

import useCountdown from '../../hooks/useCountdown';
import BackButton from '../../ui/BackButton';

function Timer() {
   const PREPARE_SEC = 5;
   const { id } = useParams();
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

         if (id) {
            const allSeconds = calcAllSeconds(selectedWorkout.work);
            startWorkTimer(allSeconds);
         } else {
            const allSeconds = calcAllSeconds(work);
            startWorkTimer(allSeconds);
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

         if (id) {
            const allSeconds = calcAllSeconds(selectedWorkout.rest);
            startRestTimer(allSeconds);
         } else {
            const allSeconds = calcAllSeconds(rest);
            startRestTimer(allSeconds);
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
         setIsPaused(!isPaused);
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
   const location = useLocation();

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
            <button
               className="pt-3 sm:pt-0 pl-6 hover:opacity-50 transition"
               onClick={() => setIsPaused(!isPaused)}
            >
               {isPaused ? (
                  <span className="text-[2.5rem] sm:text-[2rem]">
                     <IoPlaySharp />
                  </span>
               ) : (
                  <span className="text-[2.1rem] sm:text-[1.6rem]">
                     <GrPauseFill />
                  </span>
               )}
            </button>
            <BackButton styles="self-end pr-5 pt-1" />
         </div>
         <div className="flex flex-col items-center justify-center gap-20 sm:gap-8 pb-20">
            <div className="flex gap-10 sm:gap-6 items-center">
               <button
                  className="hover:opacity-50 transition"
                  onClick={handleDec}
               >
                  ⏮
               </button>
               <span className="text-7xl sm:text-6xl">
                  {id ? selectedWorkoutCopy.sets : sets}x
               </span>
               <button
                  className="hover:opacity-50 transition"
                  onClick={handleInc}
               >
                  ⏭
               </button>
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
