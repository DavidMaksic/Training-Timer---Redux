import { Link } from 'react-router-dom';

function Options() {
   return (
      <div className="flex flex-col">
         <div className="flex justify-center mt-1">
            <Link
               to="/createworkout"
               className="ml-5 sm:ml-[0.7rem] px-8 py-3 my-2 hover:bg-lime-100 transition flex justify-center items-center gap-3 rounded-full text-3xl sm:text-2xl"
            >
               <ion-icon name="save-outline"></ion-icon>
               <span>Save</span>
            </Link>

            <span className="px-10 sm:px-2 flex items-center text-3xl text-[#7c7c7c]">
               |
            </span>

            <Link to="/presets">
               <button className="px-5 pl-8 py-3 my-2  hover:bg-lime-100 transition flex justify-center items-center gap-2 rounded-full text-3xl sm:text-2xl">
                  <span>Presets</span>
                  <ion-icon name="arrow-redo-outline"></ion-icon>
               </button>
            </Link>
         </div>
         <div className="h-[1px] bg-gradient-to-r from-[#BEBEBE] via-neutral-500 to-[#AEAEAE]"></div>
      </div>
   );
}

export default Options;
