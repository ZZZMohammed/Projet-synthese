import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../public/img/teth.png.webp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/aythAction';
import './navbar.css'

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await dispatch(logout());
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo - LEFT SIDE */}
        <Link className="navbar-brand" to="/">
          <img 
            src={logo} 
            alt="Theth Logo" 
            width="100" 
            height="40"
            className="d-inline-block align-top"
          />
        </Link>

        {/* Mobile toggle button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links - CENTER */}
        <div className="collapse navbar-collapse links m-2" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold " to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/Gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/mybook">My Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Book Now Button - RIGHT SIDE */}
        <div className="d-none d-lg-flex ms-auto">
          <Link to={'/list'} className="btn btn-primary">Book Now</Link>
          {isAuthenticated && (
            <button className='btn btn-danger ms-2' onClick={handleLogout}>LogOut</button>
          )}
        </div>
      </div>
    </nav>
  );
}