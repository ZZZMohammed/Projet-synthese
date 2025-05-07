import React from 'react'
import {Link} from 'react-router-dom'

export default function Admin() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='d-flex gap-5'>
          <div>
              <Link to={'/allTimes'} className='nav-link text-white bg-dark p-4 d-flex align-items-center justify-content-center fw-bold' style={{width: '200px', height: '100px'}}>
                  Available <br />Time Slots
              </Link>
          </div>

          <div>
              <Link  to={'/allBookings'} className='nav-link text-white bg-primary p-4 d-flex align-items-center justify-content-center fw-bold' style={{width: '200px', height: '100px'}}>
                  All Bookings
              </Link>
          </div>

          <div>
              <Link  to={'/notifications'} className='nav-link text-white bg-danger p-4 d-flex align-items-center justify-content-center fw-bold' style={{width: '200px', height: '100px'}}>
                  Notifications
              </Link>
          </div>
      </div>
    </div>
  )
}