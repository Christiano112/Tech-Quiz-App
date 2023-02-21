import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './config/firebase';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';

const SignIn = () => {
    const [signedIn, setSignedIn] = React.useState(true);
    const [modalMessage, setModalMessage] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onLoginSubmit = (data: any) => {
        // console.log(data);

        const email = data.email;
        const password = data.pass;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
                setModalMessage('Login Successful');
                setShowModal(true);
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
            .catch((error) => {
                console.log([error.code, error.message])
                if (error.code === 'auth/user-not-found') {
                    setModalMessage('Incorrect Email');
                } else if (error.code === 'auth/wrong-password') {
                    setModalMessage('Incorrect Password');
                } else {
                    setModalMessage("Incorrect Email or Password");
                }
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false)
                }, 10000)
            });
    }

    const onRegisterSubmit = (data: any) => {
        // console.log(data);

        const email = data.email;
        const password = data.pass;
        const confirmPassword = data.password;
        if (password !== confirmPassword) {
            setModalMessage('Passwords do not match');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false)
            }, 10000)
            return;
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log(user);
                    setModalMessage('Registration Successful');
                    setShowModal(true);
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                })
                .catch((error) => {
                    console.log([error.code, error.message])
                    if (error.code === 'auth/email-already-in-use') {
                        setModalMessage('Email already in use');
                    } else {
                        setModalMessage('Registration Unsuccessful');
                    }
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false)
                    }, 10000)
                });

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // ...
                });
            const actionCodeSettings = {
                url: 'quiz-app-c20a3.firebaseapp.com/?email=' + auth.currentUser.email,
                iOS: {
                    bundleId: 'com.example.ios'
                },
                android: {
                    packageName: 'com.example.android',
                    installApp: true,
                    minimumVersion: '12'
                },
                handleCodeInApp: false,
                // When multiple custom dynamic link domains are defined, specify which
                // one to use.
                dynamicLinkDomain: "quiz-app-c20a3.firebaseapp.com"
            };
            auth.sendEmailVerification(auth.currentUser, actionCodeSettings)
                .then(function () {
                    // Verification email sent.
                    alert("Email Sent")
                })
                .catch(function (error: any) {
                    // Error occurred. Inspect error.code.
                    alert("Unsuccessful")
                });
        }

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
                                pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email address' },
                            })} aria-invalid={errors.email ? "true" : "false"}
                                className='input' placeholder='Email' autoComplete='email'
                            />
                            {errors.email && <p role="alert" className='text-red-600 text-xs'>{`${errors.email?.message}`}</p>}
                        </div>
                        <div>
                            <input type='password' {...register('pass', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            })} aria-invalid={errors.password ? "true" : "false"}
                                className='input' placeholder='Password' autoComplete="current-password"
                            />
                            {errors.pass && <p role="alert" className='text-red-600 text-xs'>{`${errors.pass?.message}`}</p>}
                        </div>
                        <button type="submit" className='btn'>Sign In</button>
                    </form>
                </section>
                :
                <section className='bg-white w-[90%] mx-auto shadow-lg rounded-b-lg'>
                    <h1 className='text-xl md:text-3xl text-center text-slate-800 font-bold py-8 px-4'>Create an account</h1>
                    <form onSubmit={handleSubmit(onRegisterSubmit)} className='flex flex-col gap-4 justify-center items-center mt-8'>
                        <div>
                            <input type='text' {...register('username', {
                                required: 'Username is required',
                            })} aria-invalid={errors.username ? "true" : "false"}
                                className='input' placeholder='Username'
                            />
                            {errors.username && <p role="alert" className='text-red-600 text-xs'>{`${errors.username?.message}`}</p>}
                        </div>
                        <div>
                            <input type='email' {...register('email', {
                                required: 'Please input your email',
                                pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email address' },
                            })} aria-invalid={errors.email ? "true" : "false"}
                                className='input' placeholder='Email' autoComplete='email'
                            />
                            {errors.email && <p role="alert" className='text-red-600 text-xs'>{`${errors.email?.message}`}</p>}
                        </div>
                        <div>
                            <input type='password' {...register('pass', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            })} aria-invalid={errors.password ? "true" : "false"}
                                className='input' placeholder='Password' autoComplete="new-password"
                            />
                            {errors.pass && <p role="alert" className='text-red-600 text-xs'>{`${errors.pass?.message}`}</p>}
                        </div>
                        <div>
                            <input type='password' {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                // validate: {
                                //     matchesPreviousPassword: (value) => {
                                //         const { pass } = getValues();
                                //         return pass === value || 'Passwords should match!';
                                //     }
                                // }
                            })} aria-invalid={errors.pass ? "true" : "false"}
                                className='input' placeholder='Confirm Password' autoComplete="new-password"
                            />
                            {errors.password && <p role="alert" className='text-red-600 text-xs'>{`${errors.password?.message}`}</p>}
                        </div>
                        <button type="submit" className='btn'>Sign Up</button>
                    </form>
                </section>
            }
            {showModal &&
                <Modal>
                    {modalMessage}
                </Modal>}
        </section>
    )
}

export default SignIn;