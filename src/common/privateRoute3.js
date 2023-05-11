import { useEffect } from 'react';
import { Outlet, Route, useNavigate} from 'react-router-dom';

const PrivateRoute3 = () => {
  const navigateTo = useNavigate();
  const quiz = localStorage.getItem('quiz');

  useEffect(() => {
    if (!quiz) {
      navigateTo('/dashboard')
    };
  }, [quiz, navigateTo]);

  return <Outlet />
};

export default PrivateRoute3;