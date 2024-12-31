import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { resetScreens } from '../features/timer/timerSlice';
import {
   resetState,
   setsDecrease,
   setsIncrease,
   workDecrease,
   workIncrease,
   restDecrease,
   restIncrease,
} from '../features/workouts/workoutSlice';

import Button from './buttons/Button';
import { calcInputTime } from '../utils/helpers';

function Inputs({ children }) {
   const timerDispatch = useDispatch();
   const workoutDispatch = useDispatch();
   const { sets, work, rest } = useSelector((store) => store.workouts);
   const { minsWork, minsRest, secondsWork, secondsRest } = calcInputTime(
      work,
      rest
   );

   useEffect(() => {
      workoutDispatch(resetState());
      timerDispatch(resetScreens());
   }, [workoutDispatch, timerDispatch]);

   return (
      <section className="flex flex-col items-center gap-8">
         <div className="flex flex-col gap-2">
            <label className="self-center text-xl">SETS</label>
            <div className="flex gap-10 sm:gap-8 items-center">
               <Button setter={setsDecrease}>-</Button>
               <span className="w-[5.7rem] text-center font-bold">{sets}</span>

               <Button setter={setsIncrease}>+</Button>
            </div>
         </div>

         <div className="flex flex-col gap-2">
            <label className="self-center text-xl">WORK</label>
            <div className="flex gap-10 sm:gap-8 items-center">
               <Button setter={workDecrease}>-</Button>
               <span className="font-bold w-[5.7rem]">
                  {minsWork < 10 && '0'}
                  {minsWork}:{secondsWork < 10 && '0'}
                  {secondsWork}
               </span>

               <Button setter={workIncrease}>+</Button>
            </div>
         </div>

         <div className="flex flex-col gap-2">
            <label className="self-center text-xl">REST</label>
            <div className="flex gap-10 sm:gap-8 items-center">
               <Button setter={restDecrease}>-</Button>
               <span className="font-bold w-[5.7rem]">
                  {minsRest < 10 && '0'}
                  {minsRest}:{secondsRest < 10 && '0'}
                  {secondsRest}
               </span>

               <Button setter={restIncrease}>+</Button>
            </div>
         </div>

         {children}
      </section>
   );
}

export default Inputs;
