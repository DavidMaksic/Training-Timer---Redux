export function calcAllSeconds(time) {
   const workMins = Math.floor(time);
   const workSeconds = Math.round((time - workMins) * 100);
   const allSeconds = workMins * 60 + workSeconds;
   return allSeconds;
}
