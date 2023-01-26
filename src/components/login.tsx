import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './config/firebase'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);

    const email = data.email;
    const password = data.pass;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  return (
    <section className='p-8 bg-sky-600'>
      <h1 className='text-center font-bold text-2xl text-pink-500 mb-10'>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-end md:items-end md:mr-[50%]'>
        <div>
          <label htmlFor="email">Email</label>
          <input type='email' {...register('email', {
            required: 'Please input your email',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
          })} />
        </div>
        <div>
          <label htmlFor="pass">Password</label>
          <input type='password' {...register('pass', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least one letter and one number' },
          })} />
        </div>
        <button type="submit" className='btn'>Login</button>
      </form>

      <p className='text-center text-2xl font-bold text-white'>Don't have an account? <Link to="/register" className='hover:text-pink-500 underline underline-offset-8'>Register</Link></p>
    </section>
  )
}

export default Login;
