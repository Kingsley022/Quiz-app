import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';


const PrivateRoute1 = () => {
  const userToken = JSON.parse(localStorage.getItem("quizzyToken"));
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!userToken){
      navigateTo('/')
    }
  }, [userToken, navigateTo]);

  return <Outlet />
};

export default PrivateRoute1;
