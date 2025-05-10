import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary py-5" style={{ backgroundColor: '#176ABC' }}>
      <div className="container">
        <div className="row">
          {/* Column 1 - About */}
          <div className="col-md-3 mb-4 mb-md-0">
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
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 small text-decoration-none hover:text-white">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-white-50 small text-decoration-none hover:text-white">Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/doctors" className="text-white-50 small text-decoration-none hover:text-white">Doctors</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-white-50 small text-decoration-none hover:text-white">Appointments</Link>
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

          {/* Column 4 - Newsletter */}
          <div className="col-md-3">
            <h5 className="text-white mb-3">Newsletter</h5>
            <p className="text-white-50 small mb-3">
              Subscribe to our newsletter for updates.
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control form-control-sm" 
                placeholder="Your email" 
              />
              <button className="btn btn-light btn-sm" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top border-primary pt-4 mt-4">
          <p className="text-white-50 small text-center mb-0">
            &copy; {new Date().getFullYear()} Medical Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;