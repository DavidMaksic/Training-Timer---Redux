import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTime } from '../features/timer/timerSlice';

function useDisplayTime(prepareSeconds, workSeconds, restSeconds) {
   const timerDispatch = useDispatch();

   useEffect(() => {
      if (prepareSeconds) timerDispatch(setTime(prepareSeconds));
      if (workSeconds) timerDispatch(setTime(workSeconds));
      if (restSeconds) timerDispatch(setTime(restSeconds));
   }, [prepareSeconds, workSeconds, restSeconds, timerDispatch]);
}

export default useDisplayTime;
