
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home' 
import Login from './pages/login'
import Register from './pages/register'
import Notfound from './pages/Notfound'
import Admin from './pages/admin'

export default function App() {
  return (
    
    <BrowserRouter >

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='*' element={<Notfound/>}/>
    
      </Routes>
    
    </BrowserRouter>
  )
}
