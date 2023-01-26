import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from './config/firebase'


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        const email = data.email;
        const password = data.pass;

        createUserWithEmailAndPassword(auth, email, password)
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

        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
    };


    return (
        <section className='p-8 bg-sky-600'>
            <h1 className='text-center font-bold text-2xl text-pink-500 mb-8'>Welcome to KRIS QUIZ, Kindly SignUp to Play!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-end md:items-end md:mr-[50%]'>
                <div>
                    <label htmlFor="name">Username</label>
                    <input {...register('username', {
                        required: 'Input Username',
                        minLength: { value: 8, message: 'Username must be at least 8 characters' }
                    })}
                        aria-invalid={errors.username ? "true" : "false"}
                    />
                    {errors.username?.type === 'required' && <p role="alert" className='text-red-600 text-xs'>Username is required</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type='email' {...register('email', {
                        required: 'Please input your email',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                    })}
                        aria-invalid={errors.email? "true" : "false"}
                     />
                    {errors.email && <p role="alert" className='text-red-600 text-xs'>Invalid Email</p>}
                </div>
                <div>
                    <label htmlFor="pass">Password</label>
                    <input type='password' {...register('pass', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least one letter and one number' },
                    })} />
                </div>
                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <input type='password' {...register('password', {
                        required: 'Please Confirm Password',
                        // validate: {
                        //     matchesPreviousPassword: (value) => {
                        //         const { pass } = getValues();
                        //         return pass === value || 'Passwords should match!';
                        //     }
                        // }
                    })} />
                </div>

                <button type="submit" className='btn'>Register</button>
            </form>

            <p className='text-center text-2xl font-bold text-white'>Already have an account? <Link to="/login" className='hover:text-pink-500 underline underline-offset-8'>Login</Link></p>
        </section>
    )
}

export default Register;

// function getValues(): { pass: any; } {
//     throw new Error('Function not implemented.');
// }

