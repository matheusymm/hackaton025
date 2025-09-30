import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const STARTING_MINUTES = 20;
const STARTING_SECONDS = STARTING_MINUTES * 60;

interface GlobalTimerProps {
  onTimeUp: () => void;
}

const GlobalTimer = ({ onTimeUp }: GlobalTimerProps) => {
  const [seconds, setSeconds] = useState(() => {
    const storedEndTime = localStorage.getItem('timerEndTime');

    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const remainingSeconds = Math.round((endTime - Date.now()) / 1000);
      return remainingSeconds > 0 ? remainingSeconds : 0;
    }

    const newEndTime = Date.now() + STARTING_SECONDS * 1000;
    localStorage.setItem('timerEndTime', String(newEndTime));
    return STARTING_SECONDS;
  });

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds <= 0 && isActive) { // Usamos <= para garantir que a função seja chamada
      setIsActive(false);
      onTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeUp]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      setIsActive(false);
    }
  }, [onTimeUp]);


  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const percentage = (seconds / STARTING_SECONDS) * 100;

  return (
    <div className="fixed bottom-5 left-5 z-50 w-48 h-48 bg-white/20 p-2 rounded-full shadow-lg backdrop-blur-sm border border-white/30">
      <CircularProgressbar
        value={percentage}
        text={formatTime()}
        strokeWidth={5}
        styles={buildStyles({
          textColor: '#334155',
          pathColor: '#3b82f6',
          trailColor: 'rgba(0, 0, 0, 0.1)',
          textSize: '24px',
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
};

export default GlobalTimer;