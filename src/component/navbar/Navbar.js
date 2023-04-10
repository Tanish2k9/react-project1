import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to = "/">HOME</Link>
    </div>
  )
}

export default Navbar