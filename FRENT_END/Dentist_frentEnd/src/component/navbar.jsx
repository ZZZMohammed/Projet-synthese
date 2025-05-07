import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/teth.png.webp';

export default function Navbar() {
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
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/befor">Before/After</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/galery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mybook">My Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Book Now Button - RIGHT SIDE */}
        <div className="d-none d-lg-flex ms-auto">
          <Link to={'/list'} className="btn btn-primary">Book Now</Link>
        </div>
      </div>
    </nav>
  );
}