import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';

function Main({ children }) {
   const { isFinished } = useSelector((store) => store.timer);
   const location = useLocation();

   return (
      <div className="min-h-screen sm:pt-5 bg-gradient-to-br from-gray-800 to-neutral-600 selection:bg-lime-600 selection:text-white text-4xl text-neutral-700">
         <div
            className={`fixed sm:overflow-y-scroll sm:h-full top-2/4 left-2/4 translate-x-[-50%] translate-y-[-60%] sm:translate-y-[-50%] w-1/3 xl:w-1/2 md:w-4/5 sm:w-11/12 mx-auto ${
               location.pathname.includes('/timer')
                  ? 'sm:w-full sm:h-min sm:top-[65%]'
                  : ''
            }`}
         >
            {location.pathname.includes('/timer') || <Header />}
            <main
               className={`bg-gradient-to-tl from-[#949494] to-[#c0c0c0] rounded-3xl overflow-hidden flex flex-col shadow-2xl sm:mb-10 ${
                  isFinished ? 'gap-0' : 'gap-12'
               } ${location.pathname.includes('/timer') ? 'sm:mb-0' : ''}`}
            >
               {children}
            </main>
         </div>
      </div>
   );
}

export default Main;
