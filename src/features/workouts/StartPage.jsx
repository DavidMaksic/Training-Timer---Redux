import { BsLightningChargeFill } from 'react-icons/bs';
import Options from '../../ui/Options';
import Inputs from '../../ui/Inputs';
import MainButton from '../../ui/buttons/MainButton';

function StartPage() {
   return (
      <>
         <Options />
         <Inputs>
            <MainButton setPath="/timer" styles="text-5xl p-8 sm:p-6 mt-6">
               <span className="text-[2rem] inline-block pr-2 align-[-5px]">
                  <BsLightningChargeFill />
               </span>
               START
            </MainButton>
         </Inputs>
      </>
   );
}

export default StartPage;
