
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/home' 
import Login from './pages/login'
import Register from './pages/register'
import Notfound from './pages/Notfound'
import Admin from './pages/admin'
import Contact from './pages/contact'
import TimeSlotPage from './pages/timeSlotPage'
import Navbar from './component/navbar';

export default function App() {
  return (
    
    <BrowserRouter >

     <Navbar />
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/list' element={<TimeSlotPage/>}/>
        <Route path='*' element={<Notfound/>}/>
    
      </Routes>
    
    </BrowserRouter>
  )
}
