import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full" style={{ backgroundColor: '#176ABC' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="text-white">
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm mb-4">
              Providing quality healthcare services with compassion and excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="text-white">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-gray-200">Home</Link></li>
              <li><Link to="/services" className="text-sm hover:text-gray-200">Services</Link></li>
              <li><Link to="/doctors" className="text-sm hover:text-gray-200">Doctors</Link></li>
              <li><Link to="/appointments" className="text-sm hover:text-gray-200">Appointments</Link></li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="text-white">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-sm">
              <p className="mb-2">123 Medical Center Drive</p>
              <p className="mb-2">City, State 12345</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: info@medicalcenter.com</p>
            </address>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="text-white">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm rounded-l focus:outline-none w-full"
              />
              <button className="bg-white text-blue-700 px-4 py-2 rounded-r text-sm font-medium hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-500 mt-8 pt-6 text-center text-white text-sm">
          <p>&copy; {new Date().getFullYear()} Medical Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;