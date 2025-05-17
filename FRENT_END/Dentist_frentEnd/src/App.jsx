import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
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
import Gallery from './pages/gallery';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data

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
          <Route path='/Gallery' element={<Gallery/>} />
          <Route path='/mybook' element={<MyBook/>} />
          <Route path='*' element={<Notfound/>} />
        </Route>

        {/* Admin Routes without Navbar and Footer */}
        {user?.role === 'admin' ? (
          <>
            <Route path='/admin' element={<Admin/>} />
            <Route path='/users' element={<AllUsers/>} />
            <Route path='/allTimes' element={<AllTimeSlots/>} />
            <Route path='/allBookings' element={<AllBookings/>} />
            <Route path='/notifications' element={<Notifications/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/back' element={<Admin/>} />
          </>
        ) : (
          // Redirect non-admins trying to access admin routes
          <Route path='/admin/*' element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}