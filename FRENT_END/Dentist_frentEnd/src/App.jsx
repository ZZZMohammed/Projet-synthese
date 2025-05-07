import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Notfound from './pages/Notfound';
import Admin from './pages/admin';
import Contact from './pages/contact';
import TimeSlotPage from './pages/timeSlotPage';
import Navbar from './component/navbar';
import About from './pages/about';
import Galery from './pages/galery';
import BeforAfter from './pages/BeforAfter';
import AllTimeSlots from './pages/admin/allTimeSlots';
import AllBookings from './pages/admin/allBookings';
import Notifications from './pages/admin/notifications';
import MyBook from './pages/MyBook';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/list' element={<TimeSlotPage/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/galery' element={<Galery/>} />
        <Route path='/befor' element={<BeforAfter/>} />
        <Route path='/mybook' element={<MyBook/>} />
        <Route path='*' element={<Notfound/>} />

        {/* Protected Admin Routes */}
        {user?.role === 'admin' ? (
          <>
            <Route path='/admin' element={<Admin/>} />
            <Route path='/allTimes' element={<AllTimeSlots/>} />
            <Route path='/allBookings' element={<AllBookings/>} />
            <Route path='/notifications' element={<Notifications/>} />
          </>
        ) : (
          // Redirect non-admins trying to access admin routes
          <Route path='/admin/*' element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}