import Options from '../../components/Options';
import Inputs from '../../components/Inputs';
import MainButton from '../../components/MainButton';

function StartPage() {
   return (
      <>
         <Options />
         <Inputs>
            <MainButton setPath="/timer" emoji="⚡︎">
               START
            </MainButton>
         </Inputs>
      </>
   );
}

export default StartPage;
