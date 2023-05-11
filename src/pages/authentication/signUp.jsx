import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GoogleBtn from "../../common/googlebtn";
import axios from "axios";
import logo from '../../utils/images/logo5.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({animate, handleNavigate}) => {

        const[backendError, setBackendError] = useState('');
        const navigateTo  = useNavigate();
        //form schema ...yup
        const schema = yup.object({
            firstname: yup.string().required("First name is required"), 
            lastname: yup.string().required("Last name is required"),
            email: yup.string().email("Enter a valid email address").required("Email is required"),
            phoneNumber: yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number').required('Phone number is required'), 
            password: yup.string().min(8, 'Password must be at least 8 characters long')
            .max(15, 'Password must not exceed 15 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[\W_]/, 'Password must contain at least one special character')
            .required('Password is required')
        });

        //useform hook
        const{register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema), abortEarly: false});
    
        //Registering a user
        const registerUser = async (data) =>{
            try{
                if(!data) return;
                const reponse = await axios.post('http://localhost:5000/api/users', data);
                handleNavigate();
            }catch(err){
                const error = err.response.data
                if(err){
                    setBackendError(error);
                }
            }
        }

        //handleformsubmit
        const onSubmit = (formData, event) => {
            event.preventDefault();
            const data = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
            };
            if(!data) return;
            registerUser(data);

        };

        return (
        <div className={`signUp-container ${animate && 'animate'}`}>
            <div className="img-area"></div>
            
            <div className="form-area">
                <img src={logo} className="logo" onClick={() => navigateTo('/')}/>
                <p className="greeting"><span>Create an account </span><br/>To join our community and gain access to premium content</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="name-field">
                        <div className="input-n-error">
                            <div className="input-field">
                                <input placeholder='First Name' {...register('firstname')}/>
                                <i className="fa fa-user"></i>
                            </div>
                            {errors.firstname && <><small className='error'>{errors.firstname.message}</small><br/></>}
                        </div>
                        <div className="input-n-error">
                            <div className="input-field">
                                <input placeholder='Last Name' {...register('lastname')}/>
                                <i className="fa fa-user"></i>
                            </div>
                            {errors.lastname && <><small className='error'>{errors.lastname.message}</small><br/></>}
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <input placeholder='Phone Number' {...register('phoneNumber')}/>
                        <i className="fa fa-phone"></i>
                    </div>
                    {errors.phoneNumber && <><small className='error'>{errors.phoneNumber.message}</small><br/></>}
                    <div className="input-field">
                        <input placeholder='Email' {...register('email')}/>
                        <i className="fa fa-envelope"></i>
                    </div>
                    {errors.email && <><small className='error'>{errors.email.message}</small><br/></>}
                    <div className="input-field">
                        <input placeholder='Password' type='password' {...register('password')}/>
                        <i className="fa fa-lock"></i>
                    </div>
                    
                    {errors.password && <><small className='error'>{errors.password.message}</small> <br/></>}
                    
                    <button type='submit' className='submitBtn'>Join</button>
                    {backendError && <><br/><small className='error backerr'>{backendError}</small> <br/></>}
                </form>
                <GoogleBtn/>
                <p className='switch-form'>Have an account? <span onClick={handleNavigate}>Sign In</span></p>
            </div>

        </div>
    );
}
 
export default SignUp;