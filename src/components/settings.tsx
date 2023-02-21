import React from 'react'
import Form from './form';
import Navbar from './navbar';
import Modal from './modal';
import { signOut } from "firebase/auth";
import { auth } from './config/firebase';
import { useNavigate } from "react-router-dom";


const Settings = () => {
    const [showForm, setShowForm] = React.useState(true);
    const [modalMessage, setModalMessage] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            // setModalMessage('Signed out successfully');
            // setShowModal(true);
        }).catch((error) => {
            // An error happened.
            console.log(error)
            setModalMessage('Error signing out');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000)
        });
    }

    return (
        <React.Fragment>
            <Navbar />
            {showForm ?
                <section className='bg-slate-800 h-[88.8vh] overflow-y-hidden py-8 px-4'>
                    <h1 className='text-center font-bold text-2xl text-pink-500 mb-10'>Settings</h1>
                    <div className='flex flex-col gap-4 justify-center items-center'>
                        <button className='action_btn' onClick={() => setShowForm(false)}>Change Username and Picture</button>
                        <button className='action_btn' onClick={() => navigate('/signin')}>Login/Register</button>
                        <button className='action_btn' onClick={() => handleSignOut()}>Sign Out</button>
                        {/* <button className='action_btn'>Change email address</button>
                        <button className='action_btn'>Change password</button> */}
                    </div>
                </section>
                :
                <Form />
            }
            {showModal &&
                <Modal>
                    {modalMessage}
                </Modal>}
        </React.Fragment>
    )
}

export default Settings;
