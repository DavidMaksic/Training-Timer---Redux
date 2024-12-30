import BackButton from './BackButton';
import MainButton from './MainButton';
import PresetInput from './PresetInput';
import useDisableSubmit from '../hooks/useDisableSubmit';
import useCreateWorkout from '../hooks/useCreateWorkout';

function SaveWorkout({ closeModal }) {
   const { name, searchEmpty, setSearchEmpty, handleCreateWorkout } =
      useCreateWorkout();
   const btnEl = useDisableSubmit(searchEmpty, setSearchEmpty);

   return (
      <>
         <div className="bg-neutral-200 flex relative px-20 sm:px-12 pt-24 pb-12 rounded-t-3xl">
            <PresetInput />
            <span className="fixed top-1 right-2 sm:right-5 opacity-75">
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
}

export default SaveWorkout;
