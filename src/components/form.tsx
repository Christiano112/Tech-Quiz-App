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
        <section className='p-8 bg-sky-600'>
            <h1 className='text-center font-bold text-2xl text-pink-500 mb-10'>Update Username and Picture</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-end md:items-end md:mr-[50%]'>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type='text' {...register('username', {
                        required: 'Username is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })} />
                </div>

                <div>
                    <label htmlFor="pic">Profile Pic</label>
                    <input type='text' {...register('profilePic', {
                        required: 'Please upload a profile picture',
                    })} />
                </div>

                <button type="submit" className='btn'>Update</button>
            </form>
        </section>
    )
}

export default Form
