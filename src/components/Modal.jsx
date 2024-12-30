import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import useOutsideClick from '../hooks/useOutsideClick';

const ModalContext = createContext();

function Modal({ children }) {
   const [modalIsOpened, setModalIsOpened] = useState(false);

   const openModal = setModalIsOpened;
   const closeModal = () => setModalIsOpened(false);

   return (
      <ModalContext.Provider value={{ modalIsOpened, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
}

function Open({ render }) {
   const { openModal } = useContext(ModalContext);
   return render(openModal);
}

function Window({ render }) {
   const { modalIsOpened, closeModal } = useContext(ModalContext);
   const ref = useOutsideClick(closeModal);

   if (!modalIsOpened) return null;

   return createPortal(
      <div className="fixed top-0 left-0 h-screen w-full bg-[#4e4e4e36] text-neutral-600 backdrop-blur-2xl z-10">
         <div
            className="fixed top-[45%] left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col items-center"
            ref={ref}
         >
            {render(closeModal)}
         </div>
      </div>,
      document.body
   );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
