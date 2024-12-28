import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../features/workouts/workoutSlice';

function PresetInput({ width, inputBgColor }) {
   const dispatch = useDispatch();
   const { name } = useSelector((store) => store.workouts);

   return (
      <div
         className={`flex flex-col self-center text-center  gap-2 mt-[-60px] ${width}`}
      >
         <label className="text-3xl sm:text-2xl">Preset name</label>
         <input
            className={`text-2xl sm:text-xl rounded-full p-2 sm:p-[0.4rem] pl-5 sm:pl-4 text-neutral-600 ${inputBgColor}`}
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
         />
      </div>
   );
}

export default PresetInput;
