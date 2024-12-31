import { GrPauseFill } from 'react-icons/gr';
import { IoPlaySharp } from 'react-icons/io5';

function PauseButton({ setIsPaused, isPaused }) {
   return (
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
   );
}

export default PauseButton;
