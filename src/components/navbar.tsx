import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase';

const Navbar = () => {
  const [userPic, setUserPic] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.photoURL && user.photoURL.indexOf('https') !== -1) {
        setUserPic(user.photoURL)
        console.log(userPic)
      }
    } else {
      // User is signed out
      setUserPic("/chris.jpg")
    }
  });


  return (
    <nav className='py-4 shadow-xl flex items-center justify-between'>
      <div>
        <img src={userPic ? userPic : '/chris.jpg'} alt="Profile Pic" className="w-12 h-12 rounded-full mr-auto ml-4" />
      </div>
      <ul className='flex justify-end items-center gap-2 pr-4'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>SignUp</NavLink>
        <NavLink to='/settings'>Settings</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </ul>
    </nav>
  )
}

export default Navbar