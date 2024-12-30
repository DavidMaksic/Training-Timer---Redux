import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Main from './Main';
import StartPage from './features/workouts/StartPage';
import Presets from './ui/Presets';
import Timer from './features/timer/Timer';
import CreateWorkout from './features/workouts/CreateWorkout';
import FinishScreen from './ui/FinishScreen';

function App() {
   return (
      <Provider store={store}>
         <BrowserRouter basename="/Training-Timer/">
            <Main>
               <Routes>
                  <Route index element={<StartPage />} />
                  <Route path="/presets" element={<Presets />} />
                  <Route path="/createworkout" element={<CreateWorkout />} />
                  <Route path="/timer" element={<Timer />} />
                  <Route path="/timer/:id" element={<Timer />} />
                  <Route path="/finish-screen" element={<FinishScreen />} />
               </Routes>
            </Main>
         </BrowserRouter>
      </Provider>
   );
}

export default App;
