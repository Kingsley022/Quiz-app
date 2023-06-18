import {useForm} from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AppContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../utils/images/logo5.png';

const ForgottenPassword = ({animate, setForttenPassword}) => {

    const{setUser} = useContext(AppContext);
    const[serverErr, setServerErr] = useState('');
    const[newEye, setNewEye] = useState(false);
    const[confirmEye, setConfirmEye] = useState(false);
    const navigateTo = useNavigate();


    //confirmpassword form schema
    const schema = yup.object({
        email: yup.string().email("Enter a valid email address").required("Email is required"), 
        newPassword: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
            .max(15, 'Password must not exceed 15 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[\W_]/, 'Password must contain at least one special character'),
        confirmPassword: yup.string().required('Password is required')
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    });
    

    //Destructuring useForm Hook
    const{register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});


    //Handles password update
    const onSubmit = async (data) => {
        try{
            if(!data) return;
            const newData = {
                email: data.email.toLowerCase(),
                newPassword : data.confirmPassword
            }
            const response = await axios.put('http://localhost:5000/api/users/updatepassword', newData);
            setUser(response?.data);
            alert("Password Changed");
            setForttenPassword(false);
        }catch(err){
            const error = err?.response?.data;
            if(error){
                setServerErr(error);
            }
        }
    }

    return (
        <div className={`login-container ${animate && 'animate'}`}>
            <div className="img-area"></div>

            <div className="form-area">
                <img src={logo} className="logo" onClick={() => navigateTo('/')} alt="logo"/>
                <p className="greeting"><span>Hello!</span><br/>Please provide your the details bellow</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-field">
                        <input type='text' placeholder='Email' {...register('email')}/>
                        <i className="fa fa-envelope"></i>
                    </div>
                    {errors.email && <><small className='error'>{errors.email.message}</small><br/></>}

                    <div className="input-field">
                        <input type={newEye ? 'text' : 'password'} placeholder='New Password' {...register('newPassword')}/>
                        <i className={newEye ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => setNewEye(!newEye)}></i>
                    </div>
                    {errors.newPassword && <><small className='error'>{errors.newPassword.message}</small> <br/></>}

                    <div className="input-field">
                        <input type={confirmEye ? "text" : "password"} placeholder='Confirm Password' {...register('confirmPassword')}/>
                        <i className={confirmEye ?"fa fa-eye" : "fa fa-eye-slash"} onClick={() => setConfirmEye(!confirmEye)}></i>
                    </div>
                    {errors.confirmPassword && <><small className='error'>{errors.confirmPassword.message}</small> <br/></>}
                    {serverErr && <small className='error'>{serverErr}</small>}
                    <button type="submit" className="submitBtn">Update</button>
                    
                </form>
            </div>
        </div>
    );
}
 
export default ForgottenPassword;