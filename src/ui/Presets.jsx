import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetScreens } from '../features/timer/timerSlice';
import {
   loadSelectedWorkout,
   deletePreset,
} from '../features/workouts/workoutSlice';
import { FaHouse } from 'react-icons/fa6';

import MainButton from './buttons/MainButton';
import BackButton from './buttons/BackButton';
import { BsLightningCharge } from 'react-icons/bs';
import { calcInputTime } from '../utils/helpers';

function Presets() {
   const { workouts } = useSelector((store) => store.workouts);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(resetScreens());
   }, [dispatch]);

   return (
      <section className="flex flex-col">
         <div className="flex justify-between">
            <span className="pt-5 sm:pt-6 px-5 text-3xl sm:text-2xl opacity-90">
               ⭐ Your presets
            </span>
            <div className="flex items-center gap-5 sm:gap-4 pt-3 sm:pt-5 pr-5 sm:pr-4">
               <Link
                  to={'/'}
                  className="opacity-90 hover:opacity-50 transition cursor-pointer sm:text-3xl "
               >
                  <FaHouse />
               </Link>
               <BackButton styles="self-start" />
            </div>
         </div>

         <ul
            className={`relative grid sm:grid-cols-1 gap-6 px-10 sm:px-8 pt-10 pb-8 ${
               workouts.length ? 'grid-cols-2' : 'grid-cols-1'
            }`}
         >
            {workouts.length ? (
               workouts.map((preset, i) => (
                  <PresetItem
                     preset={preset}
                     i={i}
                     key={preset.name}
                     workouts={workouts}
                  />
               ))
            ) : (
               <span className="opacity-75 justify-self-center py-20 text-center flex flex-col gap-3">
                  <span className="sm:opacity-75">⛔</span>
                  <span>No presets found!</span>
               </span>
            )}
         </ul>

         <MainButton
            setPath="/createworkout"
            styles=" text-5xl sm:text-[2.6rem] p-8 sm:p-5 mt-6 sm:mt-4"
         >
            {workouts.length
               ? 'Create another workout »'
               : 'Create your first workout »'}
         </MainButton>
      </section>
   );
}

function PresetItem({ preset, workouts }) {
   const dispatch = useDispatch();
   const { name, sets, work, rest, id } = preset;
   const { minsWork, minsRest, secondsWork, secondsRest } = calcInputTime(
      work,
      rest
   );

   function handleSelectWorkout(id) {
      const [clickedWorkout] = workouts.filter((item) => item.id === id);
      dispatch(loadSelectedWorkout(clickedWorkout));
   }

   return (
      <li className="bg-neutral-300 grid grid-rows-1 rounded-3xl text-2xl sm:text-xl overflow-hidden">
         <div className="pt-4 px-6 sm:px-8 sm:pt-5 grid grid-rows-1 gap-2 sm:gap-3">
            <div className="flex justify-between gap-2">
               <h2 className="font-bold text-3xl">{name}</h2>
               <button
                  className="text-lg opacity-75 self-start hover:opacity-50 transition"
                  onClick={() => dispatch(deletePreset(id))}
               >
                  ✖️
               </button>
            </div>

            <div className="h-[1px] bg-neutral-500"></div>

            <div className="flex justify-between">
               <span>Sets</span>
               <span>{sets}</span>
            </div>

            <div className="flex justify-between">
               <span>Work</span>
               <span>
                  {minsWork < 10 && '0'}
                  {minsWork}:{secondsWork < 10 && '0'}
                  {secondsWork}
               </span>
            </div>

            <div className="flex justify-between">
               <span>Rest</span>
               <span>
                  {minsRest < 10 && '0'}
                  {minsRest}:{secondsRest < 10 && '0'}
                  {secondsRest}
               </span>
            </div>
         </div>

         <MainButton
            setPath={`/timer/${id}`}
            styles="text-4xl p-3 mt-5"
            handler={() => handleSelectWorkout(id)}
         >
            <span className="text-[1.6rem] inline-block pr-2 align-[-5px]">
               <BsLightningCharge />
            </span>
            Start
         </MainButton>
      </li>
   );
}

export default Presets;
