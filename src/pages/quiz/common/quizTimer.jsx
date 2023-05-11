import { useState, useEffect } from "react";

const QuizTimer = ({ quiz, handleQuizSubmit }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    parseInt(localStorage.getItem("timeRemaining")) || 300
  );

  useEffect(() => {
    if (quiz) {
      localStorage.setItem("timeRemaining", timeRemaining);
    }
  }, [timeRemaining, quiz]);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeRemaining <= 0) {
      handleQuizSubmit();
      console.log('Submitted');
    }
    return () => {
      clearTimeout(timer);
    };
  }, [quiz, timeRemaining, handleQuizSubmit]);

  const quizMinutes = Math.floor(timeRemaining / 60);
  const quizSeconds = timeRemaining % 60;

  return (
    <div>

        <h3 className='interval'>
        {quizMinutes}:{quizSeconds < 10 ? `0${quizSeconds}` : quizSeconds}
      </h3>
  
    </div>
  );
};

export default QuizTimer;

