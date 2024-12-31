import { Link } from 'react-router-dom';

function MainButton({ children, setPath, handler, element, styles }) {
   return (
      <Link
         className={`bg-lime-200 w-full flex items-center justify-center text-center hover:bg-lime-100 transition font-bold hover:shadow-lime ${styles}`}
         to={setPath}
         ref={element}
         onClick={handler}
         style={{ fontFamily: 'Iceland' }}
      >
         {children}
      </Link>
   );
}

export default MainButton;
