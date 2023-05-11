import { useState } from 'react';
import '../../../styles/signOut.css';
import Menu from '../menu';
import NavBar from '../nav';
import { useNavigate } from 'react-router-dom';


const SignOut = () => {
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const navigateTo = useNavigate();


  const handleConfirmSignOut = () => {
    setConfirmSignOut(true);
    setTimeout(() => {
        navigateTo('/');
        localStorage.removeItem("user");
    }, 2000);
  };

  const handleCancelSignOut = () => {
    navigateTo('/dashboard');
  };

  return (
    <div className="dashboard">
            <Menu/>
            <div className="main">
                <NavBar/>

                <div className="signout-container">
                    {!confirmSignOut && (
                        <>
                        <p>Are you sure you want to sign out?</p>
                        <div className="signout-btns">
                            <button className="signout-button" onClick={handleConfirmSignOut}>
                                Yes, Sign Out
                            </button>

                            <button className="cancel-button" onClick={handleCancelSignOut}>
                                Cancel
                            </button>
                        </div>
                        </>
                    )}
                    {confirmSignOut && (
                        <>
                            <h3>Signing out ...</h3>
                        </>
                    )}
                </div>
            </div>
            
    </div>
    
  );
};

export default SignOut;
