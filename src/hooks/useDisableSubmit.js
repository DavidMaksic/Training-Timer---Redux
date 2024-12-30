import { useEffect, useRef } from 'react';

// - Disable button and show error message if input is empty when button is clicked

function useDisableSubmit(searchEmpty, setSearchEmpty) {
   const btnEl = useRef(null);

   useEffect(() => {
      if (searchEmpty) {
         const btnElement = btnEl.current;
         btnElement.classList.add('failed-save');
         btnElement.classList.add('hover:failed-save-hover');

         const i = setTimeout(() => {
            btnElement.classList.remove('failed-save');
            btnElement.classList.remove('hover:failed-save-hover');

            setSearchEmpty(false);
         }, 3000);

         return function () {
            clearTimeout(i);
         };
      }
   }, [searchEmpty, setSearchEmpty, btnEl]);

   return btnEl;
}

export default useDisableSubmit;
