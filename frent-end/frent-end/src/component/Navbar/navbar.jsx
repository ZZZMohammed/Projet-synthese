import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../public/img/teth.png.webp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/aythAction';
import './navbar.css';

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
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Theth Logo" width="110" height="40" />
        </Link>

        {/* Mobile toggle */}
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

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto nav-links">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/">Home</Link>
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

          {/* Right Buttons */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/list" className="btn btn-primary fw-semibold">
              Book Now
            </Link>

            {isAuthenticated && (
              <button className="btn btn-danger fw-semibold" onClick={handleLogout}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
