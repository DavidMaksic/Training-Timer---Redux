import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';

function Button({ children, setter }) {
   const dispatch = useDispatch();

   return (
      <motion.button
         className="size-[2.6rem] sm:size-[2.5rem] bg-[#d7e6b6] rounded-full pb-1 hover:bg-lime-100"
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
