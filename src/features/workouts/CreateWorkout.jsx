import BackButton from '../../components/BackButton';
import Inputs from '../../components/Inputs';
import MainButton from '../../components/MainButton';
import PresetInput from '../../components/PresetInput';
import useCreateWorkout from '../../hooks/useCreateWorkout';
import useDisableSubmit from '../../hooks/useDisableSubmit';

function CreateWorkout() {
   const { name, searchEmpty, setSearchEmpty, handleCreateWorkout } =
      useCreateWorkout();
   const btnEl = useDisableSubmit(searchEmpty, setSearchEmpty);

   return (
      <form className="flex flex-col gap-10 sm:gap-6">
         <BackButton setPath="/" styles="self-end px-5 pt-2 sm:pt-4" />
         <PresetInput width="w-2/5 sm:w-1/2" inputBgColor="bg-neutral-200 " />
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
