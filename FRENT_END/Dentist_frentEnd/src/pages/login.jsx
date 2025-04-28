import { useState } from 'react';
import React from 'react' ;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [email , setEmail] = useState('') ;
  const [password , setPassword] = useState('') ;
  const navigate = useNavigate() ;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post('http://localhost:8000/api/login' , {
        email,
        password
      });

      localStorage.setItem('token' , res.data.token) ;
      console.log('Token:', res.data.token);
      console.log('User:', res.data.user);
      
      
      if (res.data.user.role == 'admin'){
        navigate('/admin');
      }
      else {
        navigate('/') ;
      }
      alert('Login successful!');
    }
    catch (error){
       console.error('Login failed', error);
    }
    
  };

  return (
   

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Your Email</label>
        <input type="email"  value={email}  onChange={(e) =>setEmail ( e.target.value )} /><br />
        
        <label htmlFor="">Your Password</label>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/><br />

        <button type='submit'> Log <Input:btn></Input:btn></button>
      </form>
  
  )
}
