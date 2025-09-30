import './App.css'
import { useState, useEffect  } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ProfilePage from './pages/profile';
import Player from './pages/Player';
import GlobalTimer from './components/GlobalTimer';
import TimeUpOverlay from './components/TimeUpOverlay';

const App = () => {
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    localStorage.removeItem('timerEndTime');
  }, []); 


  return (
    <>
      {isTimeUp && <TimeUpOverlay />}
      <GlobalTimer onTimeUp={() => setIsTimeUp(true)} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </>
  )
}

export default App
