function useCalcDisplayTime(work, rest) {
   const minsWork = Math.floor(work);
   const secondsWork = Math.round((work - minsWork) * 60);
   const minsRest = Math.floor(rest);
   const secondsRest = Math.round((rest - minsRest) * 60);

   return { minsWork, minsRest, secondsWork, secondsRest };
}

export default useCalcDisplayTime;
