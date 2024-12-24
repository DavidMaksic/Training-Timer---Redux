import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
   decreaseTimerSet,
   increaseTimerSet,
   decreaseCurrentSet,
   increaseSelectedWorkout,
   decreaseSelectedWorkout,
   resetSelectedWorkout,
} from '../workouts/workoutSlice';
import {
   setMins,
   setSeconds,
   togglePrepareScreen,
   toggleWorkingScreen,
   toggleRestingScreen,
   currentSetDone,
   workoutFinished,
   resetScreens,
} from './timerSlice';

import useCountdown from '../../hooks/useCountdown';
import BackButton from '../../components/BackButton';
import MainButton from '../../components/MainButton';
import photo from '../../../public/congratulation.png';

function calcAllSeconds(time) {
   const workMins = Math.floor(time);
   const workSeconds = Math.round((time - workMins) * 100);
   const allSeconds = workMins * 60 + workSeconds;
   return allSeconds;
}

function Timer() {
   const PREPARE_SEC = 2;
   const { id } = useParams();

   const workoutDispatch = useDispatch();
   const timerDispatch = useDispatch();

   const { sets, work, rest, selectedWorkout, selectedWorkoutCopy } =
      useSelector((store) => store.workouts);

   const {
      isPreparing,
      isWorking,
      isResting,
      mins,
      seconds,
      finishedSet,
      isFinished,
   } = useSelector((store) => store.timer);

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
         timerDispatch(workoutFinished());
      }
   }, [sets, isPaused, selectedWorkoutCopy, setIsPaused, timerDispatch]);

   const navigate = useNavigate();

   function handleWorkoutExit() {
      workoutDispatch(resetSelectedWorkout());
      timerDispatch(workoutFinished());
      timerDispatch(resetScreens());
      navigate(-1);
   }

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

   return (
      <>
         {!isFinished ? (
            <div
               className={`flex flex-col ${isPreparing && 'bg-yellow-500 '} ${
                  isWorking && 'bg-green-400'
               } ${isResting && 'bg-violet-400'} ${
                  isPreparing && isPaused ? 'bg-yellowPaused' : ''
               } ${isWorking && isPaused ? 'bg-green-500' : ''} ${
                  isResting && isPaused ? 'bg-violetPaused' : ''
               }`}
            >
               <div className="flex justify-between">
                  <button
                     className="self-start pt-3 pl-5 hover:opacity-50 transition"
                     onClick={() => setIsPaused(!isPaused)}
                  >
                     {isPaused ? '▶' : '❚❚'}
                  </button>
                  <span className="self-end pt-3">
                     <BackButton />
                  </span>
               </div>
               <div className="flex flex-col items-center justify-center gap-8 pb-20">
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
                  <span className="text-9xl">
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
                     } ${
                        isPreparing && isPaused ? 'text-yellowTextPaused' : ''
                     } ${isWorking && isPaused ? 'text-green-300' : ''} ${
                        isResting && isPaused ? 'text-violetTextPaused' : ''
                     }`}
                  >
                     {isPreparing && 'PREPARE'}
                     {isWorking && 'WORK'}
                     {isResting && 'REST'}
                  </span>
               </div>
            </div>
         ) : (
            <>
               <div className="flex flex-col p-12 sm:p-10 bg-gradient-to-tl from-[#9e9e9e] to-gray-300 text-center">
                  <div className="flex items-center justify-center sm:gap-4">
                     <img className="w-1/3 opacity-75" src={photo} alt="Logo" />
                     <h2 className="font-black text-neutral-700 italic sm:text-3xl">
                        You finished your workout!
                     </h2>
                  </div>
               </div>
               <MainButton topMargin={'mt-0'} handler={handleWorkoutExit}>
                  Return »
               </MainButton>
            </>
         )}
      </>
   );
}

export default Timer;
