import React from 'react';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className='text-center mt-8 mb-2'>
            <p className='text-2xl font-bold'> Copyright @{`${year}`} by
                <a href="https://www.github.com/Christiano112" rel='noreferrer' className='text-pink-500 mb-8' target='_blank'> Christiano</a>
            </p>
        </footer>
    )
}

export default Footer;
