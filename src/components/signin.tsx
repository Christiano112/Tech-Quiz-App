import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from './config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
    const [signedIn, setSignedIn] = React.useState(true);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onLoginSubmit = (data: any) => {
        console.log(data);

        const email = data.email;
        const password = data.pass;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const onRegisterSubmit = (data: any) => {
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
        <section className='bg-slate-800 h-[100vh] overflow-y-hidden'>
            <div className='flex justify-evenly mt-24 sm:mt-32 bg-white w-[90%] mx-auto shadow-lg rounded-t-lg'>
                <button className={signedIn ? 'text-lg md:text-2xl bg-slate-800 w-full py-4 text-white' : 'text-lg md:text-2xl w-full py-4 bg-white text-slate-800 rounded-tl-lg'} onClick={() => setSignedIn(true)}>Sign In</button>
                <button className={!signedIn ? 'text-lg md:text-2xl bg-slate-800 w-full py-4 text-white' : 'text-lg md:text-2xl w-full py-4 bg-white text-slate-800 rounded-tr-lg'} onClick={() => setSignedIn(false)}>Sign Up</button>
            </div>
            {signedIn ?
                <section className='bg-white w-[90%] mx-auto shadow-lg rounded-b-lg'>
                    <h1 className='text-xl md:text-3xl text-center text-slate-800 font-bold py-8 px-4'>Log In to your account</h1>
                    <form onSubmit={handleSubmit(onLoginSubmit)} className='flex flex-col gap-4 justify-center items-center mt-8'>
                        <div>
                            <input type='email' {...register('email', {
                                required: 'Please input your email',
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                            })} aria-invalid={errors.email ? "true" : "false"}
                                className='input' placeholder='Email'
                            />
                            {errors.email && <p role="alert" className='text-red-600 text-xs'>Invalid Email</p>}
                        </div>
                        <div>
                            <input type='password' {...register('pass', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least one letter and one number' },
                            })} aria-invalid={errors.password ? "true" : "false"}
                                className='input' placeholder='Password'
                            />
                            {errors.password && <p role="alert" className='text-red-600 text-xs'>Invalid Password</p>}
                        </div>
                        <button type="submit" className='btn'>Sign In</button>
                    </form>
                </section>
                :
                <section className='bg-white w-[90%] mx-auto shadow-lg rounded-b-lg'>
                    <h1 className='text-xl md:text-3xl text-center text-slate-800 font-bold py-8 px-4'>Create an account</h1>
                    <form onSubmit={handleSubmit(onRegisterSubmit)} className='flex flex-col gap-4 justify-center items-center mt-8'>
                        <div>
                            <input {...register('username', {
                                required: 'Input Username',
                                minLength: { value: 8, message: 'Username must be at least 8 characters' }
                            })} aria-invalid={errors.username ? "true" : "false"}
                            className='input' placeholder='Username'
                            />
                            {errors.username?.type === 'required' && <p role="alert" className='text-red-600 text-xs'>Username is required</p>}
                        </div>
                        <div>
                            <input type='email' {...register('email', {
                                required: 'Please input your email',
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                            })} aria-invalid={errors.email ? "true" : "false"}
                            className='input' placeholder='Email'
                            />
                            {errors.email && <p role="alert" className='text-red-600 text-xs'>Invalid Email</p>}
                        </div>
                        <div>
                            <input type='password' {...register('pass', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least one letter and one number' },
                            })} aria-invalid={errors.password ? "true" : "false"}
                            className='input' placeholder='Password'
                            />
                            {errors.pass && <p role="alert" className='text-red-600 text-xs'>Invalid Password</p>}
                        </div>
                        <div>
                            <input type='password' {...register('password', {
                                required: 'Please Confirm Password',
                                // validate: {
                                //     matchesPreviousPassword: (value) => {
                                //         const { pass } = getValues();
                                //         return pass === value || 'Passwords should match!';
                                //     }
                                // }
                            })}
                            className='input' placeholder='Confirm Password'
                             />
                        </div>
                        <button type="submit" className='btn'>Sign Up</button>
                    </form>
                </section>
            }
        </section>
    )
}

export default SignIn;