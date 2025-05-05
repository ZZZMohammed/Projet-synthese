

import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/teth.png.webp'

export default function Navbar() {
  return (
    
    <nav>
        <div>
            <img src={logo} alt="theth-pic" width='100' />
        </div>
        <div>
            <Link to={'/'}>Home </Link>
            <Link >Befor/After</Link>
            <Link >Galery</Link>
            <Link >About Us</Link>
            <Link to={'/contact'}>Contact Us</Link>
        </div>
    </nav>

    
  )
}
