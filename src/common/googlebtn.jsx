import { signInWithPopup, signOut } from 'firebase/auth';
import '../styles/common.css';
import googleLogo from '../utils/images/googleLogo.png';
import { auth, googleProvider } from './../config/firebase';


const GoogleBtn = () => {
    const handleGoogleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result?.user;
      
          const userData = {
            _id: user.uid,
            firstname: user.displayName.split(' ')[0],
            lastname: user.displayName.split(' ')[1],
            email: user.email,
            phoneNumber: '004202',
          };
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error signing in with Google:', error);
        }
      };

    const handleGoogleSignOut = () =>{
        try{
            signOut();
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="google-btn" onClick={handleGoogleSignIn}>
            <img src={googleLogo}/>
            <p>Sign In with Google</p>
        </div>
    );
}

export default GoogleBtn;