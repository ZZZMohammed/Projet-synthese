import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/Home/home';
import Login from './pages/login';
import Register from './pages/register';
import Notfound from './pages/Notfound';
import Admin from './pages/admin';
import Contact from './pages/contact';
import TimeSlotPage from './pages/timeSlotPage';
import Navbar from './component/Navbar/navbar';
import About from './pages/About/about';
import AllTimeSlots from './pages/admin/allTimeSlots';
import AllBookings from './pages/admin/allBookings';
import Notifications from './pages/admin/notifications';
import MyBook from './pages/MyBook';
import Footer from './component/footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Profile from './component/profile';
import AllUsers from './pages/admin/allUsers';


export default function App() {
  // Get user from Redux store instead of localStorage directly
  const { user } = useSelector(state => state.auth);
  
  // DEBUG: Log the user data
  console.log('App.js - Redux user:', user);
  console.log('App.js - User role:', user?.role);
  console.log('App.js - Is admin?', user?.role === 'admin');
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={
          <>
            <Navbar />
              <Outlet />
            <Footer />
          </>
        }>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/list' element={<TimeSlotPage/>} />
          <Route path='/about' element={<About/>} />
   
          <Route path='/mybook' element={<MyBook/>} />
          <Route path='*' element={<Notfound/>} />         
        </Route>
               
        {user?.role === 'admin' ? (
          <>
            {console.log('Rendering admin routes')}
            <Route path='/admin' element={<Admin/>} />
            <Route path='/users' element={<AllUsers/>} />
            <Route path='/allTimes' element={<AllTimeSlots/>} />
            <Route path='/allBookings' element={<AllBookings/>} />
            <Route path='/notifications' element={<Notifications/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/back' element={<Admin/>} />
          </>
        ) : (
          <>
            {console.log('Rendering admin redirect')}
            <Route path='/admin/*' element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}