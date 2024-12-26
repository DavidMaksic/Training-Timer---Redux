import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TbArrowBack } from 'react-icons/tb';

function BackButton({ styles }) {
   const navigate = useNavigate();

   return (
      <Link
         onClick={() => navigate(-1)}
         className={`hover:opacity-50 transition text-5xl sm:text-4xl ${
            styles && styles
         }`}
      >
         <TbArrowBack />
      </Link>
   );
}

export default BackButton;
