import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from './config/firebase';
import { updateProfile } from 'firebase/auth';
import Modal from './modal';

const Form = ({ }) => {
    const [modalMessage, setModalMessage] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        // console.log(data);

        updateProfile(auth.currentUser, {
            displayName: data.username, photoURL: `${data.profilePic}`
        }).then(() => {
            // Profile updated!
            setModalMessage('Profile updated successfully');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 3000)
            // console.log([auth.currentUser?.displayName, auth.currentUser?.photoURL])

        }).catch((error) => {
            // An error occurred
            console.log(error);
            setModalMessage('Error updating profile');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000)
        });
    }

    return (
        <section className='bg-slate-800 h-[100vh] overflow-y-hidden'>
            <h1 className='text-xl md:text-3xl text-center text-slate-800 font-bold py-8 px-4 bg-white mt-24 sm:mt-32 w-[90%] mx-auto rounded-t-lg'>Update Username and Picture</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center bg-white w-[90%] mx-auto shadow-lg rounded-b-lg pt-8'>
                <div>
                    <input type='text' {...register('username', {
                        required: 'Username is required',
                    })} aria-invalid={errors.username ? "true" : "false"}
                        className='input' placeholder='Username'
                    />
                    {errors.username && <p role="alert" className='text-red-600 text-xs'>{`${errors.username?.message}`}</p>}
                </div>

                <div>
                    <input type='text' {...register('profilePic')}
                        className='input' placeholder='Image Link "URL Format"'
                    />
                </div>

                <button type="submit" className='btn'>Update</button>
            </form>
            {showModal &&
                <Modal>
                    {modalMessage}
                </Modal>}
        </section>
    )
}

export default Form
