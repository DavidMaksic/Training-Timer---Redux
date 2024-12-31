import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useWorkoutFinished(isPaused, sets, selectedWorkoutCopy, setIsPaused) {
   const navigate = useNavigate();

   useEffect(() => {
      if (isPaused) return;
      if (sets === 0 || selectedWorkoutCopy?.sets === 0) {
         setIsPaused((isPaused) => !isPaused);
         navigate('/finish-screen');
      }
   }, [sets, isPaused, selectedWorkoutCopy, setIsPaused, navigate]);
}

export default useWorkoutFinished;
