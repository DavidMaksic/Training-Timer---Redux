import { Link } from 'react-router-dom';
import Modal from './Modal';
import CreateWorkout from '../features/workouts/CreateWorkout';

function Options() {
   return (
      <div className="flex flex-col">
         <div className="flex justify-center mt-1">
            <Modal>
               <Modal.Open
                  render={(openModal) => (
                     <button
                        className="ml-5 sm:ml-[0.7rem] px-8 py-3 my-2 hover:bg-lime-100 transition flex justify-center items-center gap-3 rounded-full text-3xl sm:text-2xl"
                        onClick={openModal}
                     >
                        <ion-icon name="save-outline"></ion-icon>
                        <span>Save</span>
                     </button>
                  )}
               />
               <Modal.Window
                  render={(closeModal) => (
                     <CreateWorkout closeModal={closeModal} />
                  )}
               ></Modal.Window>
            </Modal>

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
