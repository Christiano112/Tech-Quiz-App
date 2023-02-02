import React from 'react';

const Modal = ({ children}: {children: React.ReactNode}) => {
    return (
        <div className='fixed top-0 left-0 right-0 mx-auto w-[80%] md:w-[60%]'>
            <section className='relative bg-white rounded-md shadow-lg p-8 animate-wiggle'>
                <h1 className='text-md md:text-2xl text-center my-2 font-bold'>{children}</h1>
                <div className='w-full p-2 rounded-md absolute bottom-0 left-0 animate-modal'></div>
            </section>
        </div>
    )
}

export default Modal;