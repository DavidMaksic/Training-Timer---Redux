import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
// import { useEffect, useRef } from 'react';

function Modal({ closeModal }) {
   // const ref = useRef();

   // useEffect(() => {
   //    function handleClick(e) {
   //       if (ref.current && !ref.current.contains(e.target)) {
   //          console.log('click outside');
   //          closeModal(true);
   //       }
   //    }

   //    return () => document.removeEventListener('click', handleClick);
   // }, [closeModal]);

   return createPortal(
      <div className="fixed top-0 left-0 h-screen w-full bg-[#4e4e4e36] text-neutral-600 backdrop-blur-2xl z-10">
         <div
            className="fixed top-[45%] left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col items-center"
            // ref={ref}
         >
            <ModalContent closeModal={closeModal} />
         </div>
      </div>,
      document.body
   );
}

export default Modal;
