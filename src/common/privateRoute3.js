import React, { useEffect } from 'react';
import { Outlet, Route, useNavigate } from 'react-router-dom';

const PrivateRoute3 = () => {
  const navigateTo = useNavigate();
  const selectedQuiz = localStorage.getItem('selectedQuiz');
  const quiz = localStorage.getItem('quiz');

  useEffect(() => {
    if (!selectedQuiz || !quiz) {
      navigateTo('/dashboard');
    }
  }, [selectedQuiz, quiz, navigateTo]);

  return <Outlet />;
};

export default PrivateRoute3;
