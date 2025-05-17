import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: '#1F5D74' }}>
      <div className="container">
        <div className="row">
          {/* Column 1 - About */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-white mb-3">About Us</h5>
            <p className="text-white-50 small">
              Providing quality healthcare services with compassion and excellence.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 small text-decoration-none hover:text-white">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/Gallery" className="text-white-50 small text-decoration-none hover:text-white">Gallery</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 small text-decoration-none hover:text-white">About Us</Link>
              </li>
              <li className='mb-2'>
                <Link to="/mybook" className="text-white-50 small text-decoration-none hover:text-white">My Booking</Link>
              </li>
              <li className='mb-2'>
                <Link to="/contact" className="text-white-50 small text-decoration-none hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-white mb-3">Contact Us</h5>
            <address className="text-white-50 small">
              <p className="mb-2">123 Medical Center Drive</p>
              <p className="mb-2">City, State 12345</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: info@medicalcenter.com</p>
            </address>
          </div>

         
        </div>

        {/* Copyright */}
        <div className=" border-primary pt-4 mt-4">
          <p className="text-white-50 small text-center mb-0">
            &copy; {new Date().getFullYear()} Medical Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;