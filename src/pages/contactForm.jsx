import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/button';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

const ContactForm = () => {
  const{register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema), abortEarly: false});

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="sub-header"><span className='fa fa'>~</span> Contact Us <span className='fa fa'>~</span></h2>
      <div className="form-group">
        <label htmlFor="name" className="fa fa-user"></label>
        <input type="text" id="name" name="name" placeholder='Name' {...register('name')}/>
        {errors.name && <small className='error'>{errors.name.message}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className='fa fa-envelope'></label>
        <input type="email" id="email" name="email" placeholder='Email' {...register('message')}/>
        {errors.email && <small className='error'>{errors.email.message}</small>}
      </div>
      <div className="form-group message">
        <textarea id="message" name="message" placeholder="Message" rows="3" style={{ resize: 'none'}} {...register('message')}/>
        {errors.message && <small className='error'>{errors.message.message}</small>}
      </div>

      <Button type="submit" placeholder="Send" styleBtn='contactBtn'/>
    </form>
  );
};

export default ContactForm;
