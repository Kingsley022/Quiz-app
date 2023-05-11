import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleBtn from '../../common/googlebtn';
import axios from "axios";
import { AppContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../utils/images/logo5.png';

const SignIn = ({animate, handleNavigate, setForttenPassword}) => {
    const{setUser, user} = useContext(AppContext);
    const{signInErr, setSignInErr} = useState();
    const navigateTo = useNavigate();

    //Login form schema
    const schema = yup.object({
        email: yup.string().email("Enter a valid email address").required("Email is required"), 
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
        .max(15, 'Password must not exceed 15 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[\W_]/, 'Password must contain at least one special character')
        
    });

    //Destructuring useForm Hook
    const{register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});

    // Mounts the user Details
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
        setUser(storedUser);
        }
    }, [setUser]);
    console.log(user);

    //Check if user is loggedIn
    const isLoggedIn = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user !== null;
    };


    // const handleLogin = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/users/me');
    //         localStorage.setItem("user", JSON.stringify(response?.data));
    //         console.log(response?.data)
    //     }catch(err) {
    //         alert(err.response?.data);
    //     }
    // };

   
    //Handles login
    const onSubmit = async (data) => {
        try{
            if(!data) return;
            if(isLoggedIn()) return;
            const response = await axios.post('http://localhost:5000/api/login', data);
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            setUser(response?.data);
            navigateTo('/');
        }catch(err){
            const error = err?.response?.data;
            if(error){
                setSignInErr(error);
                alert(error);
            }
        }
    }


    return (
        <div className={`login-container ${animate && 'animate'}`}>
            <div className="img-area"></div>

            <div className="form-area">
                <img src={logo} className="logo" onClick={() => navigateTo('/')}/>
                <p className="greeting"><span>Great to see you again!</span><br/>Please provide your email and password</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-field">
                        <input type='text' placeholder='Email' {...register('email')}/>
                        <i className="fa fa-envelope"></i>
                    </div>
                    {errors.email && <><small className='error'>{errors.email.message}</small><br/></>}
                    <div className="input-field">
                        <input type='password' placeholder='Password' {...register('password')}/>
                        <i className="fa fa-lock"></i>
                    </div>
                    
                    {errors.password && <><small className='error'>{errors.password.message}</small> <br/></>}
                    <button type="submit" className="submitBtn">Login</button>
                    {signInErr && <small className='error'>{signInErr} error </small>}
                </form>
                <div className="btn-container-forgot">
                    <small className='auth-question'>Don't have an account?<span onClick={handleNavigate}>Sign Up</span></small>
                    <small className='auth-question forgot-password' onClick={() => setForttenPassword(true)}>Forgot password</small>
                </div>

                <GoogleBtn/>
            </div>
        </div>
    );
}
 
export default SignIn;