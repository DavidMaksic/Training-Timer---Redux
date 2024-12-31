import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TbArrowBack } from 'react-icons/tb';

function BackButton({ styles, handler }) {
   const navigate = useNavigate();

   function handleClick() {
      if (handler) return handler();
      navigate(-1);
   }

   return (
      <Link
         onClick={handleClick}
         className={`hover:opacity-50 transition text-5xl sm:text-4xl ${
            styles && styles
         }`}
      >
         <TbArrowBack />
      </Link>
   );
}

export default BackButton;
