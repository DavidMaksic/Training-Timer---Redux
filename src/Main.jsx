import { useSelector } from 'react-redux';
import Header from './components/Header';

function Main({ children }) {
   const { isFinished } = useSelector((store) => store.timer);

   return (
      <div className="min-h-screen py-16 sm:py-0 sm:pt-5 bg-gradient-to-br from-gray-800 to-neutral-600 selection:bg-lime-600 selection:text-white text-4xl text-neutral-700">
         <Header />
         <main
            className={`bg-gradient-to-tl from-[#949494] to-[#c0c0c0] w-1/3 xl:w-1/2 md:w-4/5 sm:w-11/12 mx-auto rounded-3xl overflow-hidden flex flex-col shadow-2xl  ${
               isFinished ? 'gap-0' : 'gap-12'
            }`}
         >
            {children}
         </main>
      </div>
   );
}

export default Main;
