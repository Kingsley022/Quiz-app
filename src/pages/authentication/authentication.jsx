import { useState } from 'react';
import '../../styles/authentication.css';
import SignIn from './signIn';
import SignUp from './signUp';
import ForgottenPassword from './forgottenPassword';

const Authentication = () => {
    const[isForttenPassword, setForttenPassword] = useState(false);
   const [isSignIn, setSignIn] = useState(true);
   const[animate, setAnimate] = useState(false);

  
   const handleNavigate = () => {
        setAnimate(true);
        setSignIn(prev => !prev)
    };

    return (
        <>
            {isForttenPassword ? (<ForgottenPassword setForttenPassword ={setForttenPassword}/> ): (
                <>
                    {isSignIn ? (<SignIn setSignIn={setSignIn} animate={animate} setAnimate={setAnimate} handleNavigate={handleNavigate} setForttenPassword={setForttenPassword}/>) : (
                    (<SignUp setSignIn={setSignIn} animate={animate} setAnimate={setAnimate} handleNavigate={handleNavigate}/>)
                    )}
                </>
            )}
            
        </>
    );
}
 
export default Authentication;
