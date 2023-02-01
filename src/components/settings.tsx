import React from 'react'
import Form from './form';
import Navbar from './navbar';

const Settings = () => {
    const [showForm, setShowForm] = React.useState(true);

    return (
        <React.Fragment>
            <Navbar />
            {showForm ?
                <section className='p-8 bg-sky-600'>
                    <h1 className='text-center font-bold text-2xl text-pink-500 mb-10'>Settings</h1>
                    <ul>
                        <li>
                            <button>Change Username</button>
                        </li>
                        <li>
                            <button>Update profile picture</button>
                        </li>
                        <li>
                            <button>Change email address</button>
                        </li>
                        <li>
                            <button>Change password</button>
                        </li>
                    </ul>
                </section>
                :
                <Form />
            }
        </React.Fragment>
    )
}

export default Settings;
