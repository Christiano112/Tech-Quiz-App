import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './config/firebase';
import { updateProfile } from 'firebase/auth';

const Form = ({ }) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        // console.log(data);

        updateProfile(auth.currentUser, {
            displayName: data.username, photoURL: `${data.profilePic}`
        }).then(() => {
            // Profile updated!
            alert("Profile updated!")
            console.log([auth.currentUser?.displayName, auth.currentUser?.photoURL])

        }).catch((error) => {
            // An error occurred
            console.log(error)
        });
    }

    return (
        <section className='bg-slate-800 h-[100vh] overflow-y-hidden'>
            <h1 className='text-xl md:text-3xl text-center text-slate-800 font-bold py-8 px-4 bg-white mt-24 sm:mt-32 w-[90%] mx-auto rounded-t-lg'>Update Username and Picture</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center bg-white w-[90%] mx-auto shadow-lg rounded-b-lg pt-8'>
                <div>
                    <input type='text' {...register('username', {
                        required: 'Username is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })} className='input' placeholder='Username'
                    />
                </div>

                <div>
                    <input type='text' {...register('profilePic', {
                        required: 'Please upload a profile picture',
                    })} className='input' placeholder='Upload Profile Picture "URL Format"'
                    />
                </div>

                <button type="submit" className='btn'>Update</button>
            </form>
        </section>
    )
}

export default Form
