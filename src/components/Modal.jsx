import { createPortal } from 'react-dom';
import useOutsideClick from '../hooks/useOutsideClick';
import ModalContent from './ModalContent';

function Modal({ closeModal }) {
   const ref = useOutsideClick(closeModal);

   return createPortal(
      <div className="fixed top-0 left-0 h-screen w-full bg-[#4e4e4e36] text-neutral-600 backdrop-blur-2xl z-10">
         <div
            className="fixed top-[45%] left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col items-center"
            ref={ref}
         >
            <ModalContent closeModal={closeModal} />
         </div>
      </div>,
      document.body
   );
}

export default Modal;
