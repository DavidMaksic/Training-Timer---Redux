import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';

function Button({ children, size, setter }) {
   const dispatch = useDispatch();
   const defaultSize = 'text-3xl';

   return (
      <motion.button
         className={`size-[2.4rem] bg-[#d7e6b6] rounded-full pb-1 hover:bg-lime-100 ${
            size ? size : defaultSize
         }`}
         type="button"
         onClick={() => dispatch(setter())}
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.95 }}
      >
         {children}
      </motion.button>
   );
}

export default Button;
