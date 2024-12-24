import { Link } from 'react-router-dom';

function MainButton({
   children,
   setPath,
   emoji,
   padding,
   textSize,
   handler,
   topMargin,
   element,
}) {
   const defaultPadding = 'p-8';
   const defaultTextSize = 'text-5xl';
   const defaultTopMargin = 'mt-6';

   return (
      <Link to={setPath} className="w-full">
         <button
            className={`bg-lime-200 w-full hover:bg-lime-100 transition font-bold hover:shadow-lime ${
               padding ? padding : defaultPadding
            } ${topMargin ? topMargin : defaultTopMargin}`}
            onClick={handler}
            ref={element}
         >
            {emoji}{' '}
            <span
               className={`pl-2 ${textSize ? textSize : defaultTextSize}`}
               style={{ fontFamily: 'Iceland' }}
            >
               {children}
            </span>
         </button>
      </Link>
   );
}

export default MainButton;
