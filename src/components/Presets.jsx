import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetScreens } from '../features/timer/timerSlice';
import {
   loadSelectedWorkout,
   deletePreset,
} from '../features/workouts/workoutSlice';
import { FaHouse } from 'react-icons/fa6';

import MainButton from './MainButton';
import BackButton from './BackButton';

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
            <div className="flex items-center gap-5 sm:gap-4 pt-5 px-5 sm:px-2">
               <Link
                  to={'/'}
                  className="opacity-90 hover:opacity-50 transition cursor-pointer sm:text-3xl "
               >
                  <FaHouse />
               </Link>
               <span className="self-start">
                  <BackButton />
               </span>
            </div>
         </div>

         <ul
            className={`px-10 sm:px-3 pt-10 pb-8 grid grid-cols-2 gap-6 sm:gap-3 ${
               workouts.length ? '' : 'h-80'
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
               <span className="absolute py-24 pl-24 sm:pl-0 opacity-75">
                  ⛔ No presets found!
               </span>
            )}
         </ul>

         <MainButton setPath="/createworkout">
            {workouts.length
               ? 'Create another workout »'
               : 'Create your first workout »'}
         </MainButton>
      </section>
   );
}

function PresetItem({ preset, workouts }) {
   const { name, sets, work, rest, id } = preset;
   const dispatch = useDispatch();

   const minsWork = Math.floor(work);
   const secondsWork = Math.round((work - minsWork) * 60);
   const minsRest = Math.floor(rest);
   const secondsRest = Math.round((rest - minsRest) * 60);

   function handleSelectWorkout(id) {
      const [clickedWorkout] = workouts.filter((item) => item.id === id);
      dispatch(loadSelectedWorkout(clickedWorkout));
   }

   return (
      <li className="bg-neutral-300 grid grid-rows-1 rounded-3xl text-2xl sm:text-xl overflow-hidden">
         <div className="pt-4 px-6 sm:px-4 grid grid-rows-1 gap-2">
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
            emoji="⮞"
            padding="p-4"
            textSize="text-4xl"
            topMargin="mt-4 sm:mt-4"
            handler={() => handleSelectWorkout(id)}
         >
            Start
         </MainButton>
      </li>
   );
}

export default Presets;
