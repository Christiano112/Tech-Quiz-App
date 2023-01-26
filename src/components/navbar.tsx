import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='py-4 shadow-xl flex items-center justify-between'>
      <div>
        <img src="/chris.jpg" alt="Profile Pic" className="w-12 h-12 rounded-full mr-auto ml-4" />
      </div>
        <ul className='flex justify-end items-center gap-2 pr-4'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/quiz'>Quiz</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>SignUp</NavLink>
        </ul>
    </nav>
  )
}

export default Navbar
