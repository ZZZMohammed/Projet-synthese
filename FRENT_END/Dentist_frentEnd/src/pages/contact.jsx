
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Contact() {

    const navigate = useNavigate() ;

    const [form , setForm] = useState({
        name : '' ,
        email : '' ,
        phone : '' ,
        message : ''

    }) ;


    const handleForm = (e) =>{
        setForm({
            ...form ,
            [e.target.name] : e.target.value
        }) ;
       
        
    } ;

    const handleSubmit = async (e)=>{
        e.preventDefault() ;

        try{
            const res = await axios.post('http://localhost:8000/api/contact' , form) ;
            navigate('/') ;
            alert('message send succesfull') ;
            console.log(res.data) ;

        }
        catch(e){
            console.error(e.message) ;
        }
    }


  return (
    
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Your Name :</label>
        <input type="text" name='name' value={form.name} onChange={handleForm}/><br />

        <label htmlFor="">Your Email :</label>
        <input type="email" name='email'  value={form.email} onChange={handleForm}/><br />

        <label htmlFor="">your Phone :</label>
        <input type="text"  name='phone' value={form.phone} onChange={handleForm}/><br />

        <textarea name="message" id="" placeholder='message'  value={form.message} onChange={handleForm}>Message</textarea><br />

        <button>Send Now</button>
    </form>
  )
}


