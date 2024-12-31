function SkipSetButton({ children, handler }) {
   return (
      <button className="hover:opacity-50 transition" onClick={handler}>
         {children}
      </button>
   );
}

export default SkipSetButton;
