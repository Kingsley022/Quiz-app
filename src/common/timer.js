import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ days = 0, hours = 0, minutes = 0, seconds = 0, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(days * 86400 + hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) {
          return timeLeft - 1;
        } else {
          clearInterval(interval);
          onComplete();
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  const daysLeft = Math.floor(timeLeft / 86400).toString().padStart(2, '0');
  const hoursLeft = Math.floor((timeLeft % 86400) / 3600).toString().padStart(2, '0');
  const minutesLeft = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const secondsLeft = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className='timer'>
      <p className='digits'>{daysLeft}<span className='txt'>Days</span></p>
      <p className='digits'>{hoursLeft}<span className='txt'>Hrs</span></p>
      <p className='digits'>{minutesLeft}<span className='txt'>Mins</span></p>
      <p className='digits'>{secondsLeft}<span className='txt'>Sec</span></p>
    </div>
  );
};

export default CountdownTimer;

