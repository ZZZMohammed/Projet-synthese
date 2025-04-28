
import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {

  const [form , setForm] = useState({
      name : '' ,
      email : '' ,
      password : '',
      confirmpass : ''
  }) ;


  const handleChange = (e) =>{

    setForm({
      ...form ,
      [e.target.name]: e.target.value,
    }) ;
    
  }


  const handleSubmit = async (e)=>{
    e.preventDefault() ;

    try{

      const res = await axios.post('http://localhost:8000/api/register' , form) ;
      alert('you registred successful') ;
      console.log(res.data)
      localStorage.setItem('token' , res.data.token) ;
    }
    catch(e){
      console.error(e)
    }

  }

  return (

    <form onSubmit={handleSubmit}>

      <label htmlFor="">Your Name :</label>
      <input type="text"  name='name' value={form.name}  onChange={handleChange}/><br />

      <label htmlFor="">Your Email :</label>
      <input type="email" name='email' value={form.email}  onChange={handleChange}/><br />

      <label htmlFor="">Enter Password</label>
      <input type="password" name='password' value={form.password}  onChange={handleChange}/><br />

      <label htmlFor="">Confirmation of password</label>
      <input type="password" name='confirmpass' value={form.confirmpass}  onChange={handleChange}/><br />

      <button> Resister </button>
   
    </form>
  )
}
