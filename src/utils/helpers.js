export function calcTotalSeconds(time, type) {
   if (type === 'work') {
      const workMins = Math.floor(time);
      const workSeconds = Math.round((time - workMins) * 100);
      const totalSeconds = workMins * 60 + workSeconds;
      return totalSeconds;
   }

   if (type === 'rest') {
      const restMins = Math.floor(time);
      const restSeconds = Math.round((time - restMins) * 60);
      const totalSeconds = restMins * 60 + restSeconds;
      return totalSeconds;
   }
}

export function calcInputTime(work, rest) {
   const minsWork = Math.floor(work);
   const secondsWork = Math.round((work - minsWork) * 60);
   const minsRest = Math.floor(rest);
   const secondsRest = Math.round((rest - minsRest) * 60);

   return { minsWork, minsRest, secondsWork, secondsRest };
}
