import React, { useState } from 'react'
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router';
const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const { name, email } = formData;

    // logging out and redirecting to home
    function onLogOut() {
        auth.signOut();
        navigate('/');
    }
    return (
        <>
            <section className='max-w-6xl mx-auto'>
                <h1 className='text-3xl text-center font-bold mt-6'>My Profile</h1>
                <div className='w-full md:w-[50%] mt-6 px-3 mx-auto'>
                    <form action="">
                        {/*Name input */}
                        <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" type="text" id="name" value={name} disabled />
                        {/* email input */}
                        <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" type="email" id="eamil" value={email} disabled />

                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                            <p>Do you want to change your name?
                                <span className='ml-1 text-red-600 hover:text-red-700 transition ease-ini-out duration-200 cursor-pointer'>Edit</span>
                            </p>
                            <p onClick={onLogOut} className='text-blue-600 hover:text-blue-700 transition ease-in-out cursor-pointer'>Sign out</p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Profile