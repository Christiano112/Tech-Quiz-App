import React from 'react';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase';

const Navbar = () => {
  const [userPic, setUserPic] = React.useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.photoURL && user.photoURL.indexOf('https') !== -1) {
        setUserPic(user.photoURL)
      }
    } else {
      // User is signed out
      setUserPic('/profile.jpeg')
    }
  });


  return (
    <nav className='py-4 shadow-xl flex items-center justify-between'>
      <div>
        <NavLink to='/settings'>
          <img src={userPic ? userPic : '/profile.jpeg'} alt="Profile Pic" className="w-12 h-12 rounded-full mr-auto ml-4" title='settings' />
        </NavLink>
      </div>
      <ul className='flex justify-end items-center gap-2 pr-4'>
        <NavLink to='/' className='hover:font-bold hover:underline'>Home</NavLink>
        <NavLink to='/dashboard' className='hover:font-bold hover:underline'>Dashboard</NavLink>
      </ul>
    </nav>
  )
}

export default Navbar