import Menu from "../menu";
import '../../../styles/settings.css';
import { userDetails as userData } from "../../../data";
import editImg from '../../../utils/images/edit-img.png';
import { useState } from "react";
import NavBar from './../nav';
import {useForm} from 'react-hook-form';
import axios from "axios";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const Setting = () => {
    const[userDetails, setUserDetails] = useState(userData);
    const[activeInputValue, setActiveInputValue] = useState('');


    const schema = yup.object({
        firstname: yup.string().matches(/^[A-Za-z]+$/, 'Enter a valid name').typeError("Enter a valid name"),
        lastname: yup.string().matches(/^[A-Za-z]+$/, 'Enter a valid name').typeError("Enter a valid name"),
        email: yup.string().email("Enter a valid email address"),
        phoneNumber: yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number'),
      });
      

    const{register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});

    const handleEdit = (id) =>{
        setActiveInputValue('');
        setUserDetails(userDetails.map(newD => {
            if(newD.id === id){
                return{...newD, isDisabled:!newD.isDisabled}
                
            }else{
                return {...newD, isDisabled:true}
            }
        }));
    }

    const user = JSON.parse(localStorage.getItem("user"));
    // const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const handleUpdate = async (data) => {
        const { firstname, lastname, email, phoneNumber } = data;
        const updatedData = {
            firstname: firstname ?? user.firstname,
            lastname: lastname ?? user.lastname,
            email: email ?? user.email,
            phoneNumber: phoneNumber ?? user.phoneNumber
        };
        try{
            if(!updatedData) return;
            const response  = await axios.put(`https://quizzy-server-xpay.onrender.com/api/users/${user._id}`, updatedData);
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response?.data)
        }catch(err){
            console.log(err.message)
        }
    }

    const handleInputChange = (index, value) => {
        setActiveInputValue(value);
    }

    return (
        <div className="dashboard">
            <Menu/>
            <div className="main">
                <NavBar/>
                <div className="profile-container">
                    <div className="profile">
                        <div className="account-details"> 
                            {userDetails.map( (userD, index )=> (
                                <div className="account-detail" key={userD.id}>
                                    <div className="detail-n-icon">
                                        <p className='name'>{userD.label}</p>
                                        {userD.isEditable && <i className='fa fa-edit' onClick={() => handleEdit(userD.id)}></i>}
                                    </div>

                                    <form onSubmit={handleSubmit(handleUpdate)}>
                                        <input placeholder={userD?.detailData} 
                                            className={`data-detail ${!userD.isDisabled && 'focus'}`} 
                                            disabled={userD.isDisabled} 
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            {...register(userD.fieldname)}
                                        />
                                        {errors[userD.fieldname] && <><small className='error'>{errors[userD.fieldname].message}</small><br/></>}
                                        {!userD.isDisabled ? <><br/><button type="submit" className='updateBtn'>update</button> </>: ''}

                                    </form>
                                </div>
                            ))}
                        </div>

                        <div className="edit">  
                            <img src={editImg} alt="img"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Setting;