import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function BackButton({ opacity }) {
   const navigate = useNavigate();
   const opacityDefault = 'opacity-100';

   return (
      <span className="self-end px-5 pt-4">
         <Link
            disabled
            onClick={() => navigate(-1)}
            className={`hover:opacity-50 transition h-1 opacity-90 ${
               opacity ? opacity : opacityDefault
            }`}
         >
            ↩
         </Link>
      </span>
   );
}

export default BackButton;
