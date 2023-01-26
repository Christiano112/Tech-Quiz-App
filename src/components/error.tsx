import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    let navigate = useNavigate()
    return (
        <div className='flex items-center justify-center gap-4 flex-col m-4 pt-4'>
            <img src="/error404.png" alt="error-img" />
            <button onClick={() => navigate('/')}
            className='font-bold rounded-full p-2 shadow-lg bg-pink-600 text-white border-none'>Go to Home Page</button>
        </div>
    )
}

export default ErrorPage
