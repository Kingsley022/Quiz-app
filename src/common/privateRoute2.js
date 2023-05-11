import { Outlet, Route, useNavigate} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

const PrivateRoute2 = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user) {
      navigateTo('/');
    };
  }, [user, navigateTo])
  
  return <Outlet/>
};

export default PrivateRoute2;