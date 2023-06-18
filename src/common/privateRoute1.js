import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute1 = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!user) {
      navigateTo('/')
    }
  }, [user, navigateTo]);

  return <Outlet />
};

export default PrivateRoute1;
