import { useCallback, useEffect, useState } from 'react';

function useCountdown() {
   const [prepareSeconds, setPrepareSeconds] = useState();
   const [workSeconds, setWorkSeconds] = useState();
   const [restSeconds, setRestSeconds] = useState();
   const [isPaused, setIsPaused] = useState(false);

   useEffect(() => {
      if (isPaused) return;

      if (prepareSeconds) {
         const i = setTimeout(() => {
            setPrepareSeconds(prepareSeconds - 1);
         }, 1000);

         return () => clearTimeout(i);
      }

      if (workSeconds) {
         const i = setTimeout(() => {
            setWorkSeconds(workSeconds - 1);
         }, 1000);

         return () => clearTimeout(i);
      }

      if (restSeconds) {
         const i = setTimeout(() => {
            setRestSeconds(restSeconds - 1);
         }, 1000);

         return () => clearTimeout(i);
      }
   }, [prepareSeconds, workSeconds, restSeconds, isPaused]);

   const startPrepareTimer = useCallback(function startPrepareTimer(seconds) {
      setPrepareSeconds(seconds);
   }, []);

   const startWorkTimer = useCallback(function startWorkTimer(seconds) {
      setWorkSeconds(seconds);
   }, []);

   const startRestTimer = useCallback(function startRestTimer(seconds) {
      setRestSeconds(seconds);
   }, []);

   return {
      workSeconds,
      restSeconds,
      isPaused,
      prepareSeconds,
      startPrepareTimer,
      startWorkTimer,
      startRestTimer,
      setIsPaused,
   };
}

export default useCountdown;
