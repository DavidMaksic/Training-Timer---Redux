import { useLocation } from 'react-router-dom';
import BackButton from '../../ui/buttons/BackButton';
import Inputs from '../../ui/Inputs';
import MainButton from '../../ui/buttons/MainButton';
import PresetInput from '../../ui/PresetInput';
import useCreateWorkout from '../../hooks/useCreateWorkout';
import useDisableSubmit from '../../hooks/useDisableSubmit';

function CreateWorkout({ closeModal }) {
   const { name, searchEmpty, setSearchEmpty, handleCreateWorkout } =
      useCreateWorkout();
   const btnEl = useDisableSubmit(searchEmpty, setSearchEmpty);
   const location = useLocation();

   if (location.pathname === '/')
      return (
         <>
            <div className="bg-neutral-300 flex relative px-20 sm:px-12 pt-24 pb-12 rounded-t-3xl">
               <PresetInput inputBgColor="bg-neutral-100" />
               <span className="fixed top-1 right-2 sm:right-3 opacity-75">
                  <BackButton handler={closeModal} />
               </span>
            </div>
            <MainButton
               setPath={name && `/presets`}
               handler={handleCreateWorkout}
               styles="text-[2.6rem] sm:text-4xl p-8 sm:p-4 sm:py-6 rounded-b-3xl"
               element={btnEl}
            >
               {!searchEmpty ? '+ Create new workout' : 'No name found!'}
            </MainButton>
         </>
      );

   if (location.pathname === '/createworkout')
      return (
         <form className="flex flex-col gap-10 sm:gap-6">
            <BackButton setPath="/" styles="self-end px-5 pt-2 sm:pt-4" />
            <PresetInput width="w-2/5 sm:w-1/2" inputBgColor="bg-neutral-200" />
            <Inputs />
            <MainButton
               setPath={name && `/presets`}
               handler={handleCreateWorkout}
               element={btnEl}
               styles="text-5xl sm:text-[2.8rem] p-8 sm:p-6 mt-6"
            >
               {!searchEmpty ? '+ Save workout' : 'No name found!'}
            </MainButton>
         </form>
      );
}

export default CreateWorkout;
