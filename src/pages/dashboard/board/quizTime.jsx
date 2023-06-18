import React, { useEffect, useState } from 'react';

const QuizTime = ({ startTime, endTime }) => {

  const calculateTimeComponents = () => {
    let startTimestamp = Date.parse(startTime);
    let endTimestamp = Date.parse(endTime);
    const startTimeDifference = startTimestamp - Date.now();
    
    let timeDifference;
    if(startTimeDifference <= 0){
      timeDifference = endTimestamp - Date.now();
    }else{
      timeDifference = startTimestamp - Date.now();
    }

    if (timeDifference <= 0) {
      timeDifference = 0;
    }

    const seconds = Math.floor(timeDifference / 1000) % 60;
    const minutes = Math.floor(timeDifference / 1000 / 60) % 60;
    const hours = Math.floor(timeDifference / 1000 / 3600) % 24;
    const days = Math.floor(timeDifference / 1000 / 3600 / 24);

    const formattedTime = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    return formattedTime;
  };

  const [timeComponents, setTimeComponents] = useState(calculateTimeComponents());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeComponents(calculateTimeComponents());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div>
      <p className="quiz-time">
        {formatTime(timeComponents.days)} : {formatTime(timeComponents.hours)} : {formatTime(timeComponents.minutes)} : {formatTime(timeComponents.seconds)}
      </p>
    </div>
  );
};

export default QuizTime;
